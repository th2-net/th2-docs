---
weight: 20
---

# Usage

To implement a **codec** using this library you need to:

1. add the following repositories into `build.gradle`:

```groovy
maven {
    url 'https://s01.oss.sonatype.org/content/repositories/snapshots/'
}

maven {
    url 'https://s01.oss.sonatype.org/content/repositories/releases/'
}
```

2. add dependency on `com.exactpro.th2:codec:4.6.0` into `build.gradle`

3. set main class to `com.exactpro.th2.codec.MainKt`

This is usually done by using Gradle application plugin where you can set the main class like this:

```groovy
application {
   mainClassName 'com.exactpro.th2.codec.MainKt'
}
```

4. implement `codec` itself by implementing IPipelineCodec interface:

```groovy
interface IPipelineCodec : AutoCloseable {
    fun encode(messageGroup: MessageGroup): MessageGroup = TODO("encode(messageGroup) method is not implemented")
    fun encode(messageGroup: MessageGroup, context: IReportingContext): MessageGroup = encode(messageGroup)
    fun decode(messageGroup: MessageGroup): MessageGroup = TODO("decode(messageGroup) method is not implemented")
    fun decode(messageGroup: MessageGroup, context: IReportingContext): MessageGroup = decode(messageGroup)
    override fun close() {}
}
```

5. implement a factory for it, using the IPipelineCodecFactory interface:
```groovy
interface IPipelineCodecFactory : AutoCloseable {
    val protocols: Set<String>
    val settingsClass: Class<out IPipelineCodecSettings>
    fun init(dictionary: InputStream): Unit = TODO("not implemented")
    fun init(pipelineCodecContext: IPipelineCodecContext): Unit = pipelineCodecContext[DictionaryType.MAIN].use(::init)
    fun create(settings: IPipelineCodecSettings? = null): IPipelineCodec
    override fun close() {}
}
```
**NOTE**: both init methods have default implementations.
One of them must be overridden in your factory implementation.
If your **codec** needs the MAIN dictionary, only you can override the `init(dictionary: InputStream)` method.
Otherwise, you should override the `init(pipelineCodecContext: IPipelineCodecContext)` method.

**IMPORTANT**: implementation should be loadable via Java's built-in service loader.

6. That's it! Your **codec** is now complete.
