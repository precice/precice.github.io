module Jekyll
  class VersionSinceTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @version = text.strip
    end

    def render(context)
      current_version = context.registers[:site].config['precice_version']
      # Use the built-in Gem::Versions to compare versions
      released = Gem::Version.new(current_version) > Gem::Version.new(@version)
      message = if released
                  "New in version #{@version}"
                else
                  "Planned for future version #{@version}"
                end
      '<div markdown="span" class="alert alert-info" role="alert">' + message + '</div>'
    end
  end
end

Liquid::Template.register_tag('version_since', Jekyll::VersionSinceTag)
