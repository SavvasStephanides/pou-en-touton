rm -rf out
npm run build
rm -rf savvas
git clone https://github.com/SavvasStephanides/savvas.git

cp -r ./out/* ./savvas/static/pouentouton/.
cd savvas
git add -A
git commit -m "Deploy pouentouton"
git push