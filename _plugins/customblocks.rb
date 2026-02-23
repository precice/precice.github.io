module Jekyll
  class TipBlock < Liquid::Block
    def render(context)
      text = super
      '<div markdown="span" class="alert alert-success" role="alert"><i class="fa fa-check-square"></i> <b>Tip:</b> ' + text + '</div>'
    end
  end

  class NoteBlock < Liquid::Block
    def render(context)
      text = super
      '<div markdown="span" class="alert alert-info" role="alert"><i class="fa fa-info-circle"></i> <b>Note:</b> ' + text + '</div>'
    end
  end

  class ImportantBlock < Liquid::Block
    def render(context)
      text = super
      '<div markdown="span" class="alert alert-warning" role="alert"><i class="fas fa-exclamation-triangle"></i> <b>Important:</b> ' + text + '</div>'
    end
  end

  class ExperimentalBlock < Liquid::Block
    def render(context)
      text = super
      '<div markdown="span" class="alert alert-warning" role="alert"><i class="fas fa-flask"></i> <b>Experimental:</b> ' + text + '</div>'
    end
  end

  class DisclaimerBlock < Liquid::Block
    def render(context)
      text = super
      '<div markdown="span" class="alert alert-info" role="alert"><i class="fa fa-hands-wash"></i> <b>Disclaimer:</b> ' + text + '</div>'
    end
  end

  class VersionBlock < Liquid::Block
    def initialize(tag_name, markup, parse_context)
      super
      @version = markup.strip
    end

    def released?(context)
      if @version.nil? || @version.empty?
        # No version defined — treat as released (show content unconditionally)
        return true
      end

      current_version = context.registers[:site].config['precice_version']
      # Use the built-in Gem::Versions to compare versions
      Gem::Version.new(current_version) >= Gem::Version.new(@version)
    end

    def render(context)
      text = super
      message = if released?(context)
                  "Version"
                else
                  "Upcoming version"
                end
      '<div markdown="span" class="alert alert-info" role="alert"><i class="fas fa-tag"></i> ' + "<b>#{message}:</b> #{text}</div>"
    end
  end

  class WarningBlock < Liquid::Block
    def render(context)
      text = super
      '<div markdown="span" class="alert alert-danger" role="alert"><i class="fas fa-exclamation-circle"></i> <b>Warning:</b> ' + text + '</div>'
    end
  end

end

Liquid::Template.register_tag('tip', Jekyll::TipBlock)
Liquid::Template.register_tag('note', Jekyll::NoteBlock)
Liquid::Template.register_tag('important', Jekyll::ImportantBlock)
Liquid::Template.register_tag('experimental', Jekyll::ExperimentalBlock)
Liquid::Template.register_tag('disclaimer', Jekyll::DisclaimerBlock)
Liquid::Template.register_tag('warning', Jekyll::WarningBlock)
Liquid::Template.register_tag('version', Jekyll::VersionBlock)
