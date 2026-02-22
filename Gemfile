source "https://rubygems.org"

gem 'jekyll', ">= 4.1.1"

gem "posix-spawn", github: "https://github.com/rtomayko/posix-spawn/pull/93"
# sass-embeded in 3.0.0  pulls google-protobuf which fails to compile
gem "jekyll-sass-converter", "< 3"

group :jekyll_plugins do
  gem 'jekyll-algolia'
  gem 'jekyll-relative-links'
  gem 'jekyll-seo-tag'
  gem 'jekyll-sitemap'
  gem 'jekyll-redirect-from'
  gem "jekyll-last-modified-at"
  gem 'jekyll-mermaid'
end

gem 'jemoji'

group :dev do
  gem 'jekyll-watch'
end

# For googlescholar.rb
gem "nokogiri"
gem "open-uri"

# Maybe in the future
# https://rubygems.org/gems/jekyll-scholar
# https://rubygems.org/gems/jekyll-assets
# https://rubygems.org/gems/jekyll-minifier

# For current Ruby installations (3+?)
gem "webrick"
