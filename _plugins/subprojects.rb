module Jekyll
  class SubprojectGenerator < Generator
    safe true

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
        if not File.directory?(site.in_source_dir(location)) then
          message ="No subproject found at #{location}"
          Jekyll.logger.error("Tutorials:", message)
          raise RuntimeError, message
        end

        # Register the tutorial README as a page
        pages = Dir.chdir(location) do 
          Dir.foreach(".").reject{ |f| File.directory?(f) || f.end_with?(".") }.select{ |f| Utils.has_yaml_header?(site.in_source_dir(File.join(location, f))) }
        end

        if not pages.empty?() then
          Jekyll.logger.info("Adding pages:", pages.join(", "))
          pages.each do |file|
            site.pages << Page.new(site, site.source, location, file)
          end
        end

        # Copy all images to images/
        images = File.join(location, 'images')

        if File.directory?(site.in_source_dir(images)) then
          static_files = Dir.foreach(images).reject{ |f| File.directory?(f) || f.end_with?(".")}
          static_files.each do |image|
            from = File.join(images, image)
            to = File.join(image_dest, image)
            Jekyll.logger.debug("Registering:", "#{from}")

            # Check for 
            if static_filenames.include?(image)
              message = "#{image} was already added by subproject #{static_filenames[image]}!"
              Jekyll.logger.error("Collision detected:", message)
              raise RuntimeError, message
            else
              static_filenames[image] = location
            end

            # Skip the copy if the file already exists. This solves endless rebuild loops.
            if not File.exist?(site.in_source_dir(to)) then
              Jekyll.logger.debug("Writing:", "#{to}")
              FileUtils.cp(site.in_source_dir(from), site.in_source_dir(to))
            end

            # Save this static file for later
            new_static_files << StaticFile.new(site, site.source, image_dest, image)
          end
        end
      end

      # Prevent duplication of refisterred static files
      site.static_files.delete_if do |static_file|
        if new_static_files.any? { |sf| sf.relative_path == static_file.relative_path } then 
          Jekyll.logger.debug("Removing:", "Duplicate static #{static_file.relative_path}")
          true
        else 
          false
        end
      end

      # Register all statics
      site.static_files += new_static_files
    end
  end
end
