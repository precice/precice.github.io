module Jekyll
  class VersionSinceTag < Liquid::Tag
    def initialize(tag_name, text, tokens)
      super
      @version = text.strip
    end

    def render(context)
      '<div markdown="span" class="alert alert-info" role="alert">New in version ' + @version + '</div>'
    end
  end
end

Liquid::Template.register_tag('version_since', Jekyll::VersionSinceTag)
