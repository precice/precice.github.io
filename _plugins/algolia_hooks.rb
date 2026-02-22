# frozen_string_literal: true

require 'nokogiri'
require 'digest'

module Jekyll
  module Algolia
    module Hooks
      DOXYGEN_HTML_PATH = '_doxygen_html/main/classprecice_1_1Participant.html'
      DOXYGEN_URL = '/doxygen/main/classprecice_1_1Participant.html'

      def self.before_indexing_all(records, _context)
        unless File.exist?(DOXYGEN_HTML_PATH)
          Jekyll.logger.warn 'Algolia:', "Doxygen HTML not found at #{DOXYGEN_HTML_PATH}, skipping Doxygen indexing"
          return records
        end

        Jekyll.logger.info 'Algolia:', 'Parsing Doxygen Participant page for indexing...'
        doxygen_records = parse_doxygen_participant
        Jekyll.logger.info 'Algolia:', "Added #{doxygen_records.length} Doxygen records"

        records + doxygen_records
      end

      def self.parse_doxygen_participant
        html = File.read(DOXYGEN_HTML_PATH)
        doc = Nokogiri::HTML(html)
        records = []

        # Extract class overview record
        brief = doc.at_css('.contents .textblock')
        brief_text = brief ? brief.text.strip : 'Main class of the preCICE API for coupling simulations.'

        records << build_record(
          title: 'Participant Class Reference',
          anchor: nil,
          html: brief_text,
          headings: %w[precice Participant],
          object_id: 'doxygen-participant-overview'
        )

        # Extract public method records from member documentation
        doc.css('.contents .memitem').each do |memitem|
          # The anchor is on the preceding h2 > a element, or in the memname
          anchor_el = memitem.previous_element
          anchor = nil

          # Doxygen wraps each method doc in a div.memitem preceded by an h2.memtitle
          # with an anchor link. Walk back to find the anchor.
          while anchor_el
            if anchor_el.name == 'a' && anchor_el['id']
              anchor = anchor_el['id']
              break
            end
            # Check for anchor inside the element
            a_tag = anchor_el.at_css('a[id]')
            if a_tag
              anchor = a_tag['id']
              break
            end
            anchor_el = anchor_el.previous_element
          end

          # Extract method name from memname
          memname_el = memitem.at_css('.memname')
          next unless memname_el

          method_name = extract_method_name(memname_el.text.strip)
          next if method_name.nil? || method_name.empty?

          # Extract brief description
          memdoc = memitem.at_css('.memdoc')
          description = memdoc ? memdoc.text.strip.gsub(/\s+/, ' ')[0, 500] : ''
          next if description.empty?

          records << build_record(
            title: "Participant::#{method_name}",
            anchor: anchor,
            html: description,
            headings: %w[precice Participant],
            object_id: "doxygen-participant-#{anchor || Digest::MD5.hexdigest(method_name)}"
          )
        end

        records
      end

      def self.extract_method_name(memname_text)
        # memname_text looks like "void precice::Participant::initialize ()"
        # or "precice::Participant::Participant (...)"
        # Extract the last component before the parentheses
        match = memname_text.match(/(\w+)\s*\(/)
        match ? match[1] : nil
      end

      def self.build_record(title:, anchor:, html:, headings:, object_id:)
        {
          title: title,
          url: DOXYGEN_URL,
          anchor: anchor,
          html: html,
          headings: headings,
          type: 'content',
          custom_ranking: { position: 0, heading: 90 },
          objectID: object_id
        }
      end

      private_class_method :parse_doxygen_participant, :extract_method_name, :build_record
    end
  end
end
