# Attribution: Jonathan Chang
# https://jonathanchang.org/blog/easily-showcase-your-google-scholar-metrics-in-jekyll

require 'open-uri'
require 'nokogiri'

module Jekyll
  class ScholarStats < Generator
    # ID for Bungartz et al. paper
    CITATION_ID = '5053469347483527186'.freeze
    SCHOLAR_URL = 'http://scholar.google.com/scholar?hl=en&cites='.freeze
    def generate(site)
      begin
        doc = Nokogiri::HTML(URI.parse(SCHOLAR_URL + CITATION_ID).open)
        # Search for string saying 'About 123 results (0,03 sec)'
        # Split and take second value '123'
        citations = doc.css('#gs_ab_md .gs_ab_mdw').text.split[1]
        data = { 'id' => CITATION_ID,
                 'citations' => citations }
      rescue OpenURI::HTTPError, SocketError => e
        Jekyll.logger.warn "Fetching citation data failed with: #{e.message}"
        data = {}
      end
      site.data['scholar'] = data
    end
  end
end

# Usage in jekyll
# {{ site.data.scholar.id }}
# {{ site.data.scholar.citations }}
