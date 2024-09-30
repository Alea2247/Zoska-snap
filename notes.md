ls (vypise obsah/directory)
cd Dokumenty/dev (change directory dokumenty dev pracovny priecinok)

npx create-next-app@latest

https://nextjs.org/docs/pages/api-reference/cli/create-next-app 
nastavovanie pri spusteni:
What is your project named?  my-app
Would you like to use TypeScript?  No / Yes
Would you like to use ESLint?  No / Yes
Would you like to use Tailwind CSS?  No / Yes
Would you like your code inside a `src/` directory?  No / Yes
Would you like to use App Router? (recommended)  No / Yes
Would you like to use Turbopack for `next dev`?  No / Yes
Would you like to customize the import alias (`@/*` by default)?  No / Yes


npm run dev (do terminalu a spusti kod) – iba pre mna pocas vyroby
ctrl+c (zastavi kod)
npm run build (spusti kod a vytvori app) – uz na internet/von



src/app/(home)
	mui-testing
	o-mne
	podmienky

do kazdeho foldera musi ist stranka s nazvom page.tsx/layout.tsx (aj ked to je rovnake nevadi pretoze sa to naviguje podla nazvu foldera)

taketo stranky pozname: page.tsx, layout.tsx, not-found.tsx


https://mui.com/material-ui/all-components


po spraveni githubu do terminalu:
git init
git branch -m main
git config user.name "Alea2247"
git config user.email "alexandraachbergerova2007@gmail.com"
git remote add origin https://github.com/Alea2247/Zoska-snap.git
git remote -v
	origin  https://github.com/Alea2247/Zoska-snap.git (fetch)
	origin  https://github.com/Alea2247/Zoska-snap.git (push)
git add .


Git – Uklada kazdu zmenu a novu verziu kodu na lokalnom zariadeni
Github – sluzi na ulozenie zdrojoveho kodu na cloud
Vercel – Sluzba ktora poskytuje dostupnost stranky mimo localhosta. Cize na internete.


vypis struktury: #!/bin/bash function list_dir { local dir=$1 local prefix=$2 echo "$prefix|-- $(basename $dir)" for file in "$dir"/*; do if [ -d "$file" ]; then # Exclude node_modules, .next, and .git directories case "$(basename "$file")" in node_modules|.next|.git) continue ;; *) list_dir "$file" "$prefix " ;; esac elif [ -f "$file" ]; then # Display files as well echo "$prefix |-- $(basename "$file")" fi done }

list_dir "." ""