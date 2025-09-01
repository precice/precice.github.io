source "https://rubygems.org"

ruby ">= 3.1"

gem "jekyll", ">= 4.1.1", "< 5.0"

gem "posix-spawn"

# jekyll-sass-converter 3 pulls sass-embedded; staying < 3 as you noted
gem "jekyll-sass-converter", "< 3"

group :jekyll_plugins do
# "jekyll-algolia" is deprecated and pins old Nokogiri
  gem "jekyll-relative-links"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-redirect-from"
  gem "jekyll-last-modified-at"
end

gem "jemoji"

group :dev do
  gem "jekyll-watch"
end

# For googlescholar.rb
gem "nokogiri", "~> 1.18"

# "open-uri" removed: open-uri is part of Ruby stdlib
gem "webrick"
