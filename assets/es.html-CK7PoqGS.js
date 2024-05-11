import{_ as s,o as a,c as n,e}from"./app-C6GFzmMJ.js";const t={},i=e(`<h1 id="elasticsearch-kibana" tabindex="-1"><a class="header-anchor" href="#elasticsearch-kibana"><span>Elasticsearch &amp; kibana</span></a></h1><h2 id="elasticsearch" tabindex="-1"><a class="header-anchor" href="#elasticsearch"><span>Elasticsearch</span></a></h2><h3 id="基本概念" tabindex="-1"><a class="header-anchor" href="#基本概念"><span>基本概念</span></a></h3><p>Elasticsearch 本质上是一个数据库，但并不是 MySQL 这种关系型数据库，查询语言也不是 SQL，而是 Elasticsearch 自己的一套查询语言。</p><p>既然是数据库，有一些概念是互通的，如下表：</p><table><thead><tr><th style="text-align:center;">MySQL</th><th style="text-align:center;">Elasticsearch</th></tr></thead><tbody><tr><td style="text-align:center;">表（Table）</td><td style="text-align:center;">索引（Index）</td></tr><tr><td style="text-align:center;">记录（Row）</td><td style="text-align:center;">文档（Document）</td></tr><tr><td style="text-align:center;">字段（Column）</td><td style="text-align:center;">字段（Fields）</td></tr></tbody></table><h3 id="docker安装es" tabindex="-1"><a class="header-anchor" href="#docker安装es"><span>docker安装es</span></a></h3><blockquote><p>这里以 es 7.7.0 为例 somenetwork 名称随意取</p></blockquote><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">docker</span> network create somenetwork
$ <span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> es <span class="token parameter variable">--net</span> somenetwork <span class="token parameter variable">-p</span> <span class="token number">9200</span>:9200 <span class="token parameter variable">-p</span> <span class="token number">9300</span>:9300 <span class="token parameter variable">-e</span> <span class="token string">&quot;discovery.type=single-node&quot;</span> elasticsearch:7.7.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>测试是否安装成功</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> localhost:9200

<span class="token punctuation">{</span>
    <span class="token string">&quot;name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;abb9d13686bd&quot;</span>,
    <span class="token string">&quot;cluster_name&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;docker-cluster&quot;</span>,
    <span class="token string">&quot;cluster_uuid&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;0Wnxm7uJTyGUrHlDE40fWA&quot;</span>,
    <span class="token string">&quot;version&quot;</span><span class="token builtin class-name">:</span> <span class="token punctuation">{</span>
        <span class="token string">&quot;number&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;7.7.0&quot;</span>,
        <span class="token string">&quot;build_flavor&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;default&quot;</span>,
        <span class="token string">&quot;build_type&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;docker&quot;</span>,
        <span class="token string">&quot;build_hash&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;81a1e9eda8e6183f5237786246f6dced26a10eaf&quot;</span>,
        <span class="token string">&quot;build_date&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;2020-05-12T02:01:37.602180Z&quot;</span>,
        <span class="token string">&quot;build_snapshot&quot;</span><span class="token builtin class-name">:</span> false,
        <span class="token string">&quot;lucene_version&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;8.5.1&quot;</span>,
        <span class="token string">&quot;minimum_wire_compatibility_version&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;6.8.0&quot;</span>,
        <span class="token string">&quot;minimum_index_compatibility_version&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;6.0.0-beta1&quot;</span>
    <span class="token punctuation">}</span>,
    <span class="token string">&quot;tagline&quot;</span><span class="token builtin class-name">:</span> <span class="token string">&quot;You Know, for Search&quot;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="安装中文分词ik" tabindex="-1"><a class="header-anchor" href="#安装中文分词ik"><span>安装中文分词ik</span></a></h3><div class="custom-container danger"><p class="custom-container-title">DANGER</p><p>ik 的版本必须与es版本一致</p></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>//进入容器
$ <span class="token function">docker</span> <span class="token builtin class-name">exec</span> <span class="token parameter variable">-it</span> es /bin/bash
//安装插件
$ elasticsearch-plugin <span class="token function">install</span> https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.7.0/elasticsearch-analysis-ik-7.7.0.zip
//退出容器并重启
$ Ctrl+Q+P
$ <span class="token function">docker</span> restart es

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="基本使用" tabindex="-1"><a class="header-anchor" href="#基本使用"><span>基本使用</span></a></h3><ol><li>创建index</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-XPUT</span> http://localhost:9200/test_index?pretty
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>创建map</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> -H<span class="token string">&#39;Content-Type: application/json&#39;</span> <span class="token parameter variable">-XPUT</span> http://localhost:9200/test_index/_mapping?pretty -d<span class="token string">&#39;{
&quot;properties&quot;: {
    &quot;title&quot;: { &quot;type&quot;: &quot;text&quot;, &quot;analyzer&quot;: &quot;ik_max_word&quot; }, 
    &quot;description&quot;: { &quot;type&quot;: &quot;text&quot;, &quot;analyzer&quot;: &quot;ik_max_word&quot; },
    &quot;price&quot;: { &quot;type&quot;: &quot;scaled_float&quot;, &quot;scaling_factor&quot;: 100 }
    }
}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>解析：</p><ul><li>提交数据中的 properties 代表这个索引中各个字段的定义，其中 key 为字段名称，value 是字段的类型定义；</li><li>type 定义了字段的数据类型，常用的有 text / integer / date / boolean，当然还有许多类型，不一一列出。</li><li>analyzer 是一个新的概念，这是告诉 Elasticsearch 应该用什么方式去给这个字段做分词，这里我们用了 ik_max_word ik分词器提供</li></ul><ol start="3"><li>创建_doc</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> -H<span class="token string">&#39;Content-Type: application/json&#39;</span> <span class="token parameter variable">-XPUT</span> http://localhost:9200/test_index/_doc/1?pretty -d<span class="token string">&#39;{
    &quot;title&quot;: &quot;iPhone X&quot;,
    &quot;description&quot;: &quot;新品到货&quot;,
    &quot;price&quot;: 8848
}&#39;</span>
$ <span class="token function">curl</span> -H<span class="token string">&#39;Content-Type: application/json&#39;</span> <span class="token parameter variable">-XPUT</span> http://localhost:9200/test_index/_doc/2?pretty -d<span class="token string">&#39;{
    &quot;title&quot;: &quot;OPPO R15&quot;,
    &quot;description&quot;: &quot;新品到货&quot;,
    &quot;price&quot;: 2000
}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>读取数据</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> http://localhost:9200/test_index/_doc/1?pretty
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="5"><li>搜索</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&#39;localhost:9200/test_index/_search&#39;</span> //会返回所有记录
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="6"><li>简单搜索</li></ol><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token parameter variable">-XPOST</span> -H<span class="token string">&#39;Content-Type:application/json&#39;</span> http://localhost:9200/test_index/_doc/_search?pretty -d<span class="token string">&#39;
{
    &quot;query&quot; : { &quot;match&quot; : { &quot;description&quot; : &quot;新&quot; }}
}&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>获取所有index</li></ul><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&#39;localhost:9200/_cat/indices?v&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>获取指定index的map</li></ul><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&#39;localhost:9200/index/_mapping?pretty=true&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>获取指定index的所有数据</li></ul><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&#39;localhost:9200/index/_search&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ul><li>获取指定index的单条数据</li></ul><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">curl</span> <span class="token string">&#39;localhost:9200/index/_doc/id&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="安装-elasticsearch-elasticsearch" tabindex="-1"><a class="header-anchor" href="#安装-elasticsearch-elasticsearch"><span>安装 elasticsearch/elasticsearch</span></a></h3><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">composer</span> require elasticsearch/elasticsearch <span class="token string">&#39;~7.0&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote><p>我们用的是 7.x，因此需使用 ~7.0 来指定包版本</p></blockquote><p>使用</p><div class="language-php line-numbers-mode" data-ext="php" data-title="php"><pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>

<span class="token keyword">require</span> <span class="token string single-quoted-string">&#39;vendor/autoload.php&#39;</span><span class="token punctuation">;</span>

<span class="token keyword">use</span> <span class="token package">Elasticsearch<span class="token punctuation">\\</span>ClientBuilder</span><span class="token punctuation">;</span>

<span class="token variable">$client</span> <span class="token operator">=</span> <span class="token class-name static-context">ClientBuilder</span><span class="token operator">::</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">-&gt;</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="kibana" tabindex="-1"><a class="header-anchor" href="#kibana"><span>Kibana</span></a></h2><h3 id="docker安装kibana" tabindex="-1"><a class="header-anchor" href="#docker安装kibana"><span>docker安装kibana</span></a></h3><div class="custom-container danger"><p class="custom-container-title">DANGER</p><p>kibana 的版本必须与es版本一致</p></div><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>$ <span class="token function">ifconfig</span> //查出 <span class="token function">ip</span> 如:172.170.0.15
$ <span class="token function">docker</span> run <span class="token parameter variable">-d</span> <span class="token parameter variable">--name</span> kibana <span class="token parameter variable">--net</span> somenetwork <span class="token parameter variable">--ip</span> <span class="token number">172.170</span>.0.15  <span class="token parameter variable">-v</span> /home/docker/kibana/kibana.yml:/usr/share/kibana/config/kibana.yml  <span class="token parameter variable">-p</span> <span class="token number">5601</span>:5601 kibana:7.7.0
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>这里的 --net somenetwork 需要与上面 docker network create somenetwork 这一步中的 somenetwork 取值一样</p></blockquote><p>浏览器中访问 x.x.x.x:5601 即可打开页面 x.x.x.x换成你虚拟机的局域网ip</p>`,48),l=[i];function c(o,r){return a(),n("div",null,l)}const p=s(t,[["render",c],["__file","es.html.vue"]]),u=JSON.parse('{"path":"/posts/es.html","title":"Elasticsearch & kibana","lang":"zh-CN","frontmatter":{"date":"2024-05-10T00:00:00.000Z","category":["技术"],"tag":["es","Elasticsearch","kibana"]},"headers":[{"level":2,"title":"Elasticsearch","slug":"elasticsearch","link":"#elasticsearch","children":[{"level":3,"title":"基本概念","slug":"基本概念","link":"#基本概念","children":[]},{"level":3,"title":"docker安装es","slug":"docker安装es","link":"#docker安装es","children":[]},{"level":3,"title":"安装中文分词ik","slug":"安装中文分词ik","link":"#安装中文分词ik","children":[]},{"level":3,"title":"基本使用","slug":"基本使用","link":"#基本使用","children":[]},{"level":3,"title":"安装 elasticsearch/elasticsearch","slug":"安装-elasticsearch-elasticsearch","link":"#安装-elasticsearch-elasticsearch","children":[]}]},{"level":2,"title":"Kibana","slug":"kibana","link":"#kibana","children":[{"level":3,"title":"docker安装kibana","slug":"docker安装kibana","link":"#docker安装kibana","children":[]}]}],"git":{"updatedTime":1715408092000},"filePathRelative":"posts/es.md","excerpt":"\\n<h2>Elasticsearch</h2>\\n<h3>基本概念</h3>\\n<p>Elasticsearch 本质上是一个数据库，但并不是 MySQL 这种关系型数据库，查询语言也不是 SQL，而是 Elasticsearch 自己的一套查询语言。</p>\\n<p>既然是数据库，有一些概念是互通的，如下表：</p>\\n<table>\\n<thead>\\n<tr>\\n<th style=\\"text-align:center\\">MySQL</th>\\n<th style=\\"text-align:center\\">Elasticsearch</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td style=\\"text-align:center\\">表（Table）</td>\\n<td style=\\"text-align:center\\">索引（Index）</td>\\n</tr>\\n<tr>\\n<td style=\\"text-align:center\\">记录（Row）</td>\\n<td style=\\"text-align:center\\">文档（Document）</td>\\n</tr>\\n<tr>\\n<td style=\\"text-align:center\\">字段（Column）</td>\\n<td style=\\"text-align:center\\">字段（Fields）</td>\\n</tr>\\n</tbody>\\n</table>"}');export{p as comp,u as data};
