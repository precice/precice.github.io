# _plugins/image_aspect_ratio_hook.rb
require 'nokogiri'
require 'fastimage'

Jekyll::Hooks.register :pages, :post_render do |doc|
  # Process only HTML output from markdown
  next unless doc.output_ext == ".html"

  # Parse the document's HTML output using Nokogiri
  doc_html = Nokogiri::HTML(doc.output)

  # Find all <img> tags in the HTML
  doc_html.css('img').each do |img|
    # Get the image's src attribute
    img_src = img['src']

    # Check if the image exists and can be processed
    if File.exist?(img_src)
      # Get the image dimensions using FastImage
      width, height = FastImage.size(img_src)
      next unless width && height

      gcd = width.gcd(height)
      # Add a style attribute to the img tag with the aspect ratio
      img['style'] = "#{img['style']} aspect-ratio: #{width / gcd} / #{height / gcd};"
      img['loading'] = "lazy"
    end
  end

  # Save the modified HTML back to the document
  doc.output = doc_html.to_html
end
