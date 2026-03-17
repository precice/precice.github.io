require 'open3'

module Jekyll
  class LastModifiedAtGenerator < Generator
    safe true
    priority :lowest

    def generate(site)
      site.pages.each { |page| set_last_modified_at(page) }
      if site.respond_to?(:docs_to_write)
        site.docs_to_write.each { |doc| set_last_modified_at(doc) }
      end
    end

    private

    def set_last_modified_at(item)
      # Skip if already specified in frontmatter
      return if item.data['last_modified_at']

      # Skip if there's no actual file path
      file_path = item.path
      return unless file_path && File.exist?(file_path)

      dir = File.dirname(file_path)
      base = File.basename(file_path)

      # Get the timestamp from git log specifically from the file's directory.
      # This naturally works for submodules because we run it inside the submodule dir.
      stdout_str, status = Open3.capture2e("git", "-C", dir, "log", "-1", "--format=%ct", "--", base)
      timestamp = status.success? ? stdout_str.strip : ""

      if timestamp.empty?
        # Fallback to filesystem mtime if git history is not available
        parsed_date = File.mtime(file_path)
      else
        parsed_date = Time.at(timestamp.to_i)
      end

      item.data['last_modified_at'] = parsed_date
    end
  end
end
