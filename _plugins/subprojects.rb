require 'set'
module Jekyll
  class SubprojectGenerator < Generator
    safe true
    priority :high # Subprojects need to be imported before other plugins run

    def generate(site)

      image_dest = "images"

      # Contains all static files required by tutorials
      new_static_files = []
      # Contains the filenames of statics and which subproject they belong to
      static_filenames = {}

      # Generate configured tutorials
      (site.config['subprojects'] || []).each do |location|
        Jekyll.logger.info("Subproject:", "#{location}")

        # Make sure the tutorial directory and README exist
        unless File.directory?(site.in_source_dir(location))
          message ="No subproject found at #{location}"
          Jekyll.logger.error("Tutorials:", message)
          raise RuntimeError, message
        end

        # Register the tutorial README as a page
        pages = Dir.chdir(location) do 
          Dir.foreach(".").reject{ |f| File.directory?(f) || f.end_with?(".") }.select{ |f| Utils.has_yaml_header?(site.in_source_dir(File.join(location, f))) }
        end

        unless pages.empty?()
          Jekyll.logger.info("Adding pages:", pages.join(", "))
          pages.each do |file|
            site.pages << Page.new(site, site.source, location, file)
          end
        end

        # Copy all images to images/
        images = File.join(location, 'images')

        next unless File.directory?(site.in_source_dir(images))

        static_files = Dir.foreach(images).reject{ |f| File.directory?(f) || f.end_with?(".")}
        static_files.each do |image|
          from = File.join(images, image)
          to = File.join(image_dest, image)
          Jekyll.logger.debug("Registering:", "#{from}")

          # Check for 
          if static_filenames.include?(image)
            message = "#{image} was already added by subproject #{static_filenames[image]}!"
            Jekyll.logger.error("Collision detected:", message)
            raise message
          else
            static_filenames[image] = location
          end

          # Skip the copy if the file already exists. This solves endless rebuild loops.
          unless File.exist?(site.in_source_dir(to))
            Jekyll.logger.debug("Writing:", "#{to}")
            FileUtils.cp(site.in_source_dir(from), site.in_source_dir(to))
          end

          # Save this static file for later
          new_static_files << StaticFile.new(site, site.source, image_dest, image)
        end
      end

      # Reject all existing statics
      existing_statics = site.static_files.map { |sf| sf.relative_path.delete_prefix('/') }.to_set
      new_static_files.reject! { |static_file| existing_statics.include?(static_file.relative_path) }

      # Register all statics
      site.static_files += new_static_files
    end
  end
end
