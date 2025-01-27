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


1. NextAuth:
    Get started -> Adapters -> Prisma 
    npm install @prisma/client @auth/prisma-adapter
    npm install prisma --save-dev
    npx prisma init

2. Vercel -> Storage:
    Postgres -> Create -> Accept -> Region -> Frankfurt, Germany-(fra1) -> Connect
    in snap-zoska-4h-postgres:
    .env.local -> Show secret -> Copy value of POSTGRES_URL

3. VsCode:
    In .env replace value of DATABASE_URL
    .env
    POSTGRES_URL="postgresql://username:password@hostname:port/ ... /verceldb?sslmode=require"
    Create prisma.ts in src/app/api/auth/[...nextauth] -> copy code from NextAuth docs
    Update authOptions.ts -> add:   import { PrismaAdapter } from "@auth/prisma-adapter"
                                    import { prisma } from "./prisma"
                                    adapter: PrismaAdapter(prisma),

    package.json:   "build": "prisma generate && next build",
                    "postinstall": "prisma generate"


4. VsCode terminal:
    npx prisma migrate dev --name init
    npx prisma generate
    npx prisma studio


git clone https://github.com/Alea2247/Zoska-snap
cd snap-zoska
git init
git branch -m main
git config user.name "ALea2247"
git config user.email "alexandraachbergerova2007@gmail.com"
git remote add origin https://github.com/Alea2247/Zoska-snap.git
git remote -v


VsCode Source control -> Initial -> Commit -> Publish branch (Sync)

npm install
npm install @mui/material @emotion/react @emotion/styled

