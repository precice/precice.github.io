module Jekyll
  class TutorialsGenerator < Generator
    safe true

    def generate(site)
      tutorials = File.join("imported", "tutorials")

      if not File.directory?(File.join(site.source, tutorials)) then
        message = "Base tutorial directory not found #{tutorials_dir}"
        Jekyll.logger.error("Tutorials:", "Base tutorial directory not found #{tutorials_dir}")
        raise RuntimeError, message
      end

      # Contains all static files required by tutorials
      new_static_files = []

      # Generate configured tutorials
      (site.config['tutorials'] || []).each do |name|
        Jekyll.logger.info("Processing:", "Tutorial #{name}")

        # Common paths
        tutorial = File.join(tutorials, name)
        images = File.join(tutorial, 'images')
        image_dest = File.join("images")
        readme = File.join(tutorial, 'README.md')

        # Make sure the tutorial directory and README exist
        if not File.directory?(site.in_source_dir(tutorial)) then
          message ="Tutorial #{name} not found #{tutorial}"
          Jekyll.logger.error("Tutorials:", message)
          raise RuntimeError, message
        end

        if not File.exist?(site.in_source_dir(readme)) then
          message ="README.md for tutorial #{name} not found."
          Jekyll.logger.error("Tutorials:", message)
          raise RuntimeError, message
        end

        # Register the tutorial README as a page
        site.pages << Page.new(site, site.source, tutorial, 'README.md')

        # Copy all images to images/
        if File.directory?(site.in_source_dir(images)) then
          static_files = Dir.foreach(images).reject{ |f| File.directory?(f) || f.end_with?(".")}
          static_files.each do |image|
            from = File.join(images, image)
            to = File.join(image_dest, image)
            Jekyll.logger.debug("Registering:", "#{from}")

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
        relative = static_file.relative_path.delete_prefix("/")
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
