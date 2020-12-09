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

      # Remove already registered static files of tutorials in images/tutorials
      statics = File.join("images", "tutorials")
      site.static_files.delete_if do |static_file|
        relative = static_file.relative_path.delete_prefix("/")

        if relative.start_with?(statics) then
          Jekyll.logger.debug("Unregistering:", "Tutorial static #{relative}")
          true
        else 
          false
        end
      end

      # Generate configured tutorials
      (site.config['tutorials'] || []).each do |name|
        Jekyll.logger.info("Processing:", "Tutorial #{name}")

        tutorial = File.join(tutorials, name)
        docs = File.join(tutorial, 'docs')
        images = File.join(docs, 'images')
        image_dest = File.join("images", "tutorials", name)
        instructions = File.join(docs, 'instructions.md')

        if not File.directory?(site.in_source_dir(tutorial)) then
          message ="Tutorial #{name} not found #{tutorial}"
          Jekyll.logger.error("Tutorials:", message)
          raise RuntimeError, message
        end

        if not File.exist?(site.in_source_dir(instructions)) then
          message ="Instructions for tutorial #{name} not found."
          Jekyll.logger.error("Tutorials:", message)
          raise RuntimeError, message
        end

        # Register the instructions as a page
        site.pages << Page.new(site, site.source, docs, 'instructions.md')

        # Copy all images to images/tutorials/<name>/ and register as static files
        if File.directory?(site.in_source_dir(images)) then
          FileUtils.mkdir_p(site.in_source_dir(image_dest))
          static_files = Dir.foreach(images).reject{ |f| File.directory?(f) || f.end_with?(".")}
          static_files.each do |image|
            from = File.join(images, image)
            to = File.join(image_dest, image)
            Jekyll.logger.debug("Registering:", "#{from}")

            if not File.exist?(site.in_source_dir(to)) then
              Jekyll.logger.debug("Writing:", "#{to}")
              FileUtils.cp(site.in_source_dir(from), site.in_source_dir(to))
            end
            site.static_files << StaticFile.new(site, site.source, image_dest, image)
          end
        end
      end
    end
  end
end
