# Attribution: Jonathan Chang
# https://jonathanchang.org/blog/easily-showcase-your-google-scholar-metrics-in-jekyll
require 'open-uri'
require 'nokogiri'

module Jekyll
  class ScholarStats < Generator
    # Citation ID for preCICE v2 and v1 paper respectively
    CITATION_IDS = ['17974677460269868025', '5053469347483527186']
    SCHOLAR_URL = 'https://scholar.google.com/scholar?hl=en&cites='.freeze
    USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36'.freeze
    
    def generate(site)
      citation_data = []
      CITATION_IDS.each do |cit_id|
        begin
          uri = URI.parse(SCHOLAR_URL+cit_id)
          doc = Nokogiri::HTML(URI.open(uri, 'User-Agent'=>USER_AGENT))
          # Search for string saying 'About 123 results (0,03 sec)'
          # Split and take second value '123'
          citations = doc.css('#gs_ab_md .gs_ab_mdw').text.split[1]
          data = { 'id' => cit_id,
          'citations' => citations }
          Jekyll.logger.info data

          citation_data.append(data)
        rescue OpenURI::HTTPError, SocketError => e
          Jekyll.logger.warn "Fetching citation data failed with: #{e.message}"
          data = {}
          citation_data.append(data)
        end
      end
      site.data['citation_v2'] = citation_data[0]
      site.data['citation_v1'] = citation_data[1]
    end
  end
end

# Usage in jekyll
# {{ site.data.scholar.id }}
# {{ site.data.scholar.citations }}
