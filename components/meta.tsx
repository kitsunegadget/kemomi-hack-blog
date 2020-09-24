import Head from 'next/head'

export default function Meta(){
  return (
		<Head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="theme-color" content="orange" />
			<meta 
				name="description" 
				content="Yu's mini blog."
			/>
			<meta 
				name="keywords" 
				content="Kemomi Hack, ミニブログ, Kitsune Gadget, tech"
			/>
			
			<link 
				rel="apple-touch-icon"
				type="image/png"
				href="/icon128.png"
			/>
			<link 
				rel="icon"
				type="image/png"
				href="/icon128.png"
			/>
			<link
				rel="shortcut icon"
				type="image/x-icon"
				href="/favicon.ico"
			/>
		</Head>
	)
}
