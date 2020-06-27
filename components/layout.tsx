import Meta from '../components/meta'
import Head from 'next/head'
import Link from 'next/link'
import style from './layout.module.scss'
import HomeIcon from '@material-ui/icons/Home'
import TwitterIcon from '@material-ui/icons/Twitter'
import GitHubIcon from '@material-ui/icons/GitHub'
import { StylesProvider } from '@material-ui/core'

export default function Layout({
  children,
  view
}: {
  children: React.ReactNode,
  view?: boolean
}) {
	const name = "Kemomi Hack🐾"
	return (
		<div className={style.gridContainer}>
			<Meta />
			<Head>
				<title>{name}</title>
			</Head>

			{/* gridLayout */}
			<header className={style.header}>
				<Link href="/">
					<a className={style.headerContainer}>
						{/* <img src="/icon128.png" width="40" height="40" /> */}
						<h1>{name}</h1>
					</a>
				</Link>
				<div id={style.titleBar} />
			</header>

			<main className={style.main}>{ children }</main>		

			<footer className={style.footer}>
				<div className={style.footerInside}>
					<img 
						className={style.footerImage} 
						src="/pficon_400x400.jpg" 
						width="100" 
						height="100" 
					/>
					<div className={style.footerAbout}>
						<p><b>{`Yu. [UNNAMED]`}</b></p>
						<p>{`Enigma Hikikomori Programmer / Developer?`}</p>
						<a className={style.iconLink} 
							href="https://kitsunegadget.xyz" rel="noopener">
							<HomeIcon style={{ fontSize: 20 }} />
						</a>
						<a className={style.iconLink} 
							href="https://twitter.com" rel="noopener" target="_blank">
							<TwitterIcon style={{ fontSize: 20 }} />
						</a>
						<a className={style.iconLink} 
							href="https://github.com/kitsunegadget" rel="noopener" target="_blank">
							<GitHubIcon style={{ fontSize: 20 }} />
						</a>
						<br />
						<small className={style.footerSmall}>&copy; 2020 Yu. Kemomi Hack.</small>
					</div>
					
				</div>
			</footer>
		</div>
	)
}