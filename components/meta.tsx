import Head from 'next/head'

export default function Meta(){
  return (
		<Head>
			<meta charSet="utf-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="theme-color" content="orange" />
			<meta 
				name="description" 
				content="Kemomi Hack, ミニブログ, Kitsune Gadget, tech"
			/>
			<link 
				rel="apple-touch-icon"
				href="/icon128.png"
			/>
			<link
				rel="icon"
				href="/favicon.ico"
			/>
		</Head>
	)
}
