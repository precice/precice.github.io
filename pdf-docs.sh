# Note that .sh scripts work only on Mac. If you're on Windows, install Git Bash and use that as your client.

echo 'Kill all Jekyll instances'
kill -9 $(ps aux | grep '[j]ekyll' | awk '{print $2}')
clear

echo "Building PDF-friendly HTML site for Mydoc ...";
bundle exec jekyll serve --detach --config _config.yml,pdfconfigs/config_docs_pdf.yml;
echo "done";

echo "Building the PDF ...";
prince --javascript --input-list=_site/pdfconfigs/prince-list.txt -o pdf/docs.pdf;

echo "Done. Look in the pdf directory to see if it printed successfully."

# bundle exec jekyll serve --config "_config.yml,pdfconfigs/config_docs_pdf.yml"
# prince --javascript --input-list=_site/pdfconfigs/prince-list.txt -o pdf/docs.pdf
