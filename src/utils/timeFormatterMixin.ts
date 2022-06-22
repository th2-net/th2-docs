export const timeFormatterMixin = {
  methods: {
    timeSince(date: Date): string{
      const rtf = new Intl.RelativeTimeFormat('en', { style: "long" });
      const seconds = Math.floor(((+new Date()) - (+new Date(date))) / 1000);
      if (seconds > 31536000) return rtf.format(-Math.floor(seconds / 31536000), "year");
      if (seconds > 2592000) return rtf.format(-Math.floor(seconds / 2592000), "month");
      if (seconds > 86400) return rtf.format(-Math.floor(seconds / 86400), "day");
      if (seconds > 3600) return rtf.format(-Math.floor(seconds / 3600), "hour");
      if (seconds > 60) return rtf.format(-Math.floor(seconds / 60), "minute");
      return rtf.format(-Math.floor(seconds), "second");
    },
    localeDateString(date: Date): string {
      return new Date(date).toLocaleDateString()
    }
  }
}
