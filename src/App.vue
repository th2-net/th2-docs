<template>
	<v-app>
		<layout>
			<router-view />
		</layout>
	</v-app>
</template>

<static-query>
query {
	metadata {
		siteName
		siteDescription
	}
}
</static-query>

<script>
export default {
	metaInfo() {
		return {
			titleTemplate: '%s | th2 docs',
			title: 'th2 docs',
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ name: 'format-detection', content: 'telephone=no' },
				{ hid: 'description', name: 'description',
					content: 'Documentation for th2 - the next-generation test automation framework for financial markets'
				},
				{ hid: 'keywords', name: 'keywords',
					content: 'Exactpro, th2, test automation, financial technologies, microservices, kubernetes, k8s'
				},
				{ hid: 'og:site_name', name: 'og:site_name', content: 'th2 documentation' },
				{ hid: 'og:type', name: 'og:type', content: 'website' },
				{ hid: 'og:title', name: 'og:title', content: 'th2 docs' },
				{ hid: 'og:description', name: 'og:description',
					content: 'Documentation for th2 - the next-generation test automation framework for financial markets' },
				{ hid: 'og:image', name: 'og:image', content: 'https://th2.dev/og-image.png' },
				{ hid: 'robot', name: 'robot', content: 'none' }
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
			]
		}
	}
}
</script>
