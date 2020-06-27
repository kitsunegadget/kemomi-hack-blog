import styles from './set-content.module.scss'

export default function SetContent({
	content
}: {
	content: string
}) {
	return (
		<div className="">
			<div
				className={styles.markdown}
				dangerouslySetInnerHTML={{ __html: content }}
			/>
		</div>
	)
}