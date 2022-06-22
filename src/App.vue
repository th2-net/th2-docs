<template>
	<v-app :class="!$vuetify.theme.dark ? 'color-vars--light' : 'color-vars--dark'">
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
				{ hid: 'og:image', name: 'og:image', content: 'https://th2-docs.herokuapp.com/og-image.png' },
				{ hid: 'robot', name: 'robot', content: 'none' }
			],
			link: [
				{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
			]
		}
	}
}
</script>
<style>
.color-vars--light{
	/* scrollbar */
	--scrollbar-track-color: #e0e0e0;
	--scrollbar-thumb-color: #3f979f;
	--scrollbar-thumb-color--hover: #00646c;
	/* nuxt content */
	--link-color: #3f979f;
	--divider-color: #121212;
	--copy-btn__bg-color--hover: #424242;
	--copy-btn__bg-color: #171717;
	--table__border-color: #616161;
	--table__bg-color--hover: #c1c1c1;
	--table__bg-color--header: #5cb2ba;
	/* layout */
	--layout__border-color: #8f96a3;
	/* page content */
	--toc-color: #424242;
	--toc-color--active: var(--link-color);
	/* notice */
	--note-header-bg-color: #ffc107;
	--note-bg-color: #ffffae;
	--warning-header-bg-color: #b64c4c;
	--warning-bg-color: #ffd4cd;
	--info-header-bg-color: #006193;
	--info-bg-color: #e4ffff;
	/* content tree */
	--content-tree__link: #8b8b8b;
	--content-tree__link--hover: #424242;
	--content-tree__link--main: #424242;
	--content-tree__link--active: var(--link-color);
	--content-tree__link-bg--active: #dedede;
	/* search */
	--search__btn-bg-color: #4b5465;
	--search__btn-border-color: #5293c9;
	--search__text-color: #8b8b8b;
}

.color-vars--dark{
	/* scrollbar */
	--scrollbar-track-color: #171717;
	--scrollbar-thumb-color: #3f979f;
	--scrollbar-thumb-color--hover: #00646c;
	/* nuxt content */
	--link-color: #3f979f;
	--divider-color: #b7b7b7;
	--copy-btn__bg-color--hover: #424242;
	--copy-btn__bg-color: #171717;
	--table__border-color: #aeaeae;
	--table__bg-color--hover: #2c2c2c;
	--table__bg-color--header: #004c53;
	/* layout */
	--layout__border-color: #8f96a3;
	/* page content */
	--toc-color: #c1c1c1;
	--toc-color--active: var(--link-color);
	/* notice */
	--note-header-bg-color: #ffc107;
	--note-bg-color: #855a00;
	--warning-header-bg-color: #b64c4c;
	--warning-bg-color: #450000;
	--info-header-bg-color: #006193;
	--info-bg-color: #003360;
	/* content tree */
	--content-tree__link: #8b8b8b;
	--content-tree__link--hover: #c1c1c1;
	--content-tree__link--main: #a6a6a6;
	--content-tree__link--active: var(--link-color);
	--content-tree__link-bg--active: #2c2c2c;
	/* search */
	--search__btn-bg-color: #00646c;
	--search__btn-border-color: #5293c9;
	--search__text-color: #8b8b8b;
}
</style>
