require 'open3'
require 'pathname'

module Jekyll
  class ImportedLastModifiedAtGenerator < Generator
    safe true
    priority :lowest

    # Only process files under imported directory/folder
    IMPORTED_PREFIX = "imported/"

    def generate(site)
      # Collect all pages and collection documents that live under imported/
      items = (site.pages + site.documents).select do |item|
        item.relative_path.start_with?(IMPORTED_PREFIX)
      end

      by_git_root = items.group_by { |item| find_git_root(item.path) }
      # Drop any files where no .git directory was found (shouldn't happen, but safe)
      by_git_root.delete(nil)

      by_git_root.each do |git_root, git_items|
        patch_items_in_git_root(git_root, git_items)
      end
    end

    private

    def find_git_root(path)
      dir = File.dirname(path)
      loop do
        return dir if File.exist?(File.join(dir, '.git'))
        parent = File.dirname(dir)
        return nil if parent == dir
        dir = parent
      end
    end

    def patch_items_in_git_root(git_root, items)
      rel_paths = items.map do |item|
        Pathname.new(item.path).relative_path_from(Pathname.new(git_root)).to_s
      end

      timestamps = batch_git_log(git_root, rel_paths)

      items.each do |item|
        # Respect explicitly set frontmatter dates, never overwrite them
        next if item.data['last_modified_at']

        rel = Pathname.new(item.path).relative_path_from(Pathname.new(git_root)).to_s
        ts  = timestamps[rel]

        if ts.nil?
          # File has no git history, skip rather than falling back to unreliable filesystem mtime
          Jekyll.logger.warn "imported_dates:",
            "No git history for #{item.relative_path} — skipping"
          next
        end

        item.data['last_modified_at'] = Time.at(ts).utc
      end
    end

    def batch_git_log(git_root, rel_paths)
      result = {}
      cmd = ['git', '-C', git_root, 'log', '--format=%ct', '--name-only', '--diff-filter=AMRC', '--'] + rel_paths
      # Use Open3 instead of backticks to avoid shell injection from filenames
      stdout, _stderr, status = Open3.capture3(*cmd)
      return result unless status.success?

      current_ts = nil
      stdout.each_line do |line|
        line.chomp!
        if line =~ /\A\d{10,}\z/
          current_ts = line.to_i
        elsif !line.empty? && current_ts
          result[line] ||= current_ts
        end
      end
      result
    end

  end
end