<template>
  <div id="container" class="single" :class="{'mode-dark':isDarkMode}">
      <vNav></vNav>
      <vBanner></vBanner>
      <section class="body">
        <vHeader @changeMode="changeMode"></vHeader>
			<div id="article" class="main">
				<div class="article-wrapper">
					<article>
						<h1 class="title">不使用插件实现Ajax评论功能</h1>
                        <div class="article-meta">
                            <a href="#" class="avatar">
                                <img src="/static/image/avatar.jpg" alt="">
                            </a>
                            <div class="article-info">
                                <p>
                                    <span class="tag">作者</span>
                                    <router-link to="/" class="name">山野呓语</router-link>
                                </p>
                                <p>
                                    <ul>
                                        <li>10月16日</li>
                                        <li>阅读 388</li>
                                        <li>评论 4</li>
                                        <li>喜欢 2</li>
                                    </ul>
                                </p>
                            </div>
                        </div>
						<div class="post-content markdown">
		<p>为了不使用插件实现Ajax评论功能需要实现：</p><ol><li><p>监听评论表单，改用ajax方式提交</p></li><li><p>创建新的评论表单提交地址（用Typecho 主题提供的系统方法<code>themeInit</code>实现）</p></li></ol><p>当访问文章加载主题时，<code>themeInit</code>方法首先被加载，可在此方法中判断是否为添加评论的操作，即新的评论表单地址为文章的链接(<code>permalink</code>).具体判断方法如下</p><pre><code class="hljs php"><span class="hljs-comment">// 主题初始化</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">themeInit</span><span class="hljs-params">($archive)</span></span>{
    <span class="hljs-comment">// 判断是否是添加评论的操作</span>
    <span class="hljs-comment">// 为文章或页面、post操作，且包含参数`themeAction=comment`(自定义)</span>
    <span class="hljs-keyword">if</span>($archive-&gt;is(<span class="hljs-string">'single'</span>) &amp;&amp; $archive-&gt;request-&gt;isPost() &amp;&amp; $archive-&gt;request-&gt;is(<span class="hljs-string">'themeAction=comment'</span>)){
        <span class="hljs-comment">// 为添加评论的操作时</span>
        ajaxComment($archive);
    }
}</code></pre><p>要实现ajax评论，则无法使用系统默认的<code>feedback</code>,这里我们将复制<code>feedback</code>功能并改造为我们需要的方法</p><pre><code class="hljs php"><span class="hljs-comment">/**
 * ajaxComment
 * 实现Ajax评论的方法(实现feedback中的comment功能)
 * <span class="hljs-doctag">@param</span> Widget_Archive $archive
 * <span class="hljs-doctag">@return</span> void
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajaxComment</span><span class="hljs-params">($archive)</span></span>{
    $options = Helper::options();
    $user = Typecho_Widget::widget(<span class="hljs-string">'Widget_User'</span>);
    $db = Typecho_Db::get();
    <span class="hljs-comment">// Security 验证不通过时会直接跳转，所以需要自己进行判断</span>
    <span class="hljs-comment">// 需要开启反垃圾保护，此时将不验证来源</span>
    <span class="hljs-keyword">if</span>($archive-&gt;request-&gt;get(<span class="hljs-string">'_'</span>) != Helper::security()-&gt;getToken($archive-&gt;request-&gt;getReferer())){
        $archive-&gt;response-&gt;throwJson(<span class="hljs-keyword">array</span>(<span class="hljs-string">'status'</span>=&gt;<span class="hljs-number">0</span>,<span class="hljs-string">'msg'</span>=&gt;_t(<span class="hljs-string">'非法请求'</span>)));
    }
    <span class="hljs-comment">/** 评论关闭 */</span>
    <span class="hljs-keyword">if</span>(!$archive-&gt;allow(<span class="hljs-string">'comment'</span>)){
        $archive-&gt;response-&gt;throwJson(<span class="hljs-keyword">array</span>(<span class="hljs-string">'status'</span>=&gt;<span class="hljs-number">0</span>,<span class="hljs-string">'msg'</span>=&gt;_t(<span class="hljs-string">'评论已关闭'</span>)));
    }
    <span class="hljs-comment">/** 检查ip评论间隔 */</span>
    <span class="hljs-keyword">if</span> (!$user-&gt;pass(<span class="hljs-string">'editor'</span>, <span class="hljs-keyword">true</span>) &amp;&amp; $archive-&gt;authorId != $user-&gt;uid &amp;&amp;
    $options-&gt;commentsPostIntervalEnable){
        $latestComment = $db-&gt;fetchRow($db-&gt;select(<span class="hljs-string">'created'</span>)-&gt;from(<span class="hljs-string">'table.comments'</span>)
                    -&gt;where(<span class="hljs-string">'cid = ?'</span>, $archive-&gt;cid)
                    -&gt;where(<span class="hljs-string">'ip = ?'</span>, $archive-&gt;request-&gt;getIp())
                    -&gt;order(<span class="hljs-string">'created'</span>, Typecho_Db::SORT_DESC)
                    -&gt;limit(<span class="hljs-number">1</span>));

        <span class="hljs-keyword">if</span> ($latestComment &amp;&amp; ($options-&gt;gmtTime - $latestComment[<span class="hljs-string">'created'</span>] &gt; <span class="hljs-number">0</span> &amp;&amp;
        $options-&gt;gmtTime - $latestComment[<span class="hljs-string">'created'</span>] &lt; $options-&gt;commentsPostInterval)) {
            $archive-&gt;response-&gt;throwJson(<span class="hljs-keyword">array</span>(<span class="hljs-string">'status'</span>=&gt;<span class="hljs-number">0</span>,<span class="hljs-string">'msg'</span>=&gt;_t(<span class="hljs-string">'对不起, 您的发言过于频繁, 请稍侯再次发布'</span>)));
        }        
    }

    $comment = <span class="hljs-keyword">array</span>(
        <span class="hljs-string">'cid'</span>       =&gt;  $archive-&gt;cid,
        <span class="hljs-string">'created'</span>   =&gt;  $options-&gt;gmtTime,
        <span class="hljs-string">'agent'</span>     =&gt;  $archive-&gt;request-&gt;getAgent(),
        <span class="hljs-string">'ip'</span>        =&gt;  $archive-&gt;request-&gt;getIp(),
        <span class="hljs-string">'ownerId'</span>   =&gt;  $archive-&gt;author-&gt;uid,
        <span class="hljs-string">'type'</span>      =&gt;  <span class="hljs-string">'comment'</span>,
        <span class="hljs-string">'status'</span>    =&gt;  !$archive-&gt;allow(<span class="hljs-string">'edit'</span>) &amp;&amp; $options-&gt;commentsRequireModeration ? <span class="hljs-string">'waiting'</span> : <span class="hljs-string">'approved'</span>
    );

    <span class="hljs-comment">/** 判断父节点 */</span>
    <span class="hljs-keyword">if</span> ($parentId = $archive-&gt;request-&gt;filter(<span class="hljs-string">'int'</span>)-&gt;get(<span class="hljs-string">'parent'</span>)) {
        <span class="hljs-keyword">if</span> ($options-&gt;commentsThreaded &amp;&amp; ($parent = $db-&gt;fetchRow($db-&gt;select(<span class="hljs-string">'coid'</span>, <span class="hljs-string">'cid'</span>)-&gt;from(<span class="hljs-string">'table.comments'</span>)
        -&gt;where(<span class="hljs-string">'coid = ?'</span>, $parentId))) &amp;&amp; $archive-&gt;cid == $parent[<span class="hljs-string">'cid'</span>]) {
            $comment[<span class="hljs-string">'parent'</span>] = $parentId;
        } <span class="hljs-keyword">else</span> {
            $archive-&gt;response-&gt;throwJson(<span class="hljs-keyword">array</span>(<span class="hljs-string">'status'</span>=&gt;<span class="hljs-number">0</span>,<span class="hljs-string">'msg'</span>=&gt;_t(<span class="hljs-string">'父级评论不存在'</span>)));
        }
    }
    $feedback = Typecho_Widget::widget(<span class="hljs-string">'Widget_Feedback'</span>);
    <span class="hljs-comment">//检验格式</span>
    $validator = <span class="hljs-keyword">new</span> Typecho_Validate();
    $validator-&gt;addRule(<span class="hljs-string">'author'</span>, <span class="hljs-string">'required'</span>, _t(<span class="hljs-string">'必须填写用户名'</span>));
    $validator-&gt;addRule(<span class="hljs-string">'author'</span>, <span class="hljs-string">'xssCheck'</span>, _t(<span class="hljs-string">'请不要在用户名中使用特殊字符'</span>));
    $validator-&gt;addRule(<span class="hljs-string">'author'</span>, <span class="hljs-keyword">array</span>($feedback, <span class="hljs-string">'requireUserLogin'</span>), _t(<span class="hljs-string">'您所使用的用户名已经被注册,请登录后再次提交'</span>));
    $validator-&gt;addRule(<span class="hljs-string">'author'</span>, <span class="hljs-string">'maxLength'</span>, _t(<span class="hljs-string">'用户名最多包含200个字符'</span>), <span class="hljs-number">200</span>);

    <span class="hljs-keyword">if</span> ($options-&gt;commentsRequireMail &amp;&amp; !$user-&gt;hasLogin()) {
        $validator-&gt;addRule(<span class="hljs-string">'mail'</span>, <span class="hljs-string">'required'</span>, _t(<span class="hljs-string">'必须填写电子邮箱地址'</span>));
    }

    $validator-&gt;addRule(<span class="hljs-string">'mail'</span>, <span class="hljs-string">'email'</span>, _t(<span class="hljs-string">'邮箱地址不合法'</span>));
    $validator-&gt;addRule(<span class="hljs-string">'mail'</span>, <span class="hljs-string">'maxLength'</span>, _t(<span class="hljs-string">'电子邮箱最多包含200个字符'</span>), <span class="hljs-number">200</span>);

    <span class="hljs-keyword">if</span> ($options-&gt;commentsRequireUrl &amp;&amp; !$user-&gt;hasLogin()) {
        $validator-&gt;addRule(<span class="hljs-string">'url'</span>, <span class="hljs-string">'required'</span>, _t(<span class="hljs-string">'必须填写个人主页'</span>));
    }
    $validator-&gt;addRule(<span class="hljs-string">'url'</span>, <span class="hljs-string">'url'</span>, _t(<span class="hljs-string">'个人主页地址格式错误'</span>));
    $validator-&gt;addRule(<span class="hljs-string">'url'</span>, <span class="hljs-string">'maxLength'</span>, _t(<span class="hljs-string">'个人主页地址最多包含200个字符'</span>), <span class="hljs-number">200</span>);

    $validator-&gt;addRule(<span class="hljs-string">'text'</span>, <span class="hljs-string">'required'</span>, _t(<span class="hljs-string">'必须填写评论内容'</span>));

    $comment[<span class="hljs-string">'text'</span>] = $archive-&gt;request-&gt;text;

    <span class="hljs-comment">/** 对一般匿名访问者,将用户数据保存一个月 */</span>
    <span class="hljs-keyword">if</span> (!$user-&gt;hasLogin()) {
        <span class="hljs-comment">/** Anti-XSS */</span>
        $comment[<span class="hljs-string">'author'</span>] = $archive-&gt;request-&gt;filter(<span class="hljs-string">'trim'</span>)-&gt;author;
        $comment[<span class="hljs-string">'mail'</span>] = $archive-&gt;request-&gt;filter(<span class="hljs-string">'trim'</span>)-&gt;mail;
        $comment[<span class="hljs-string">'url'</span>] = $archive-&gt;request-&gt;filter(<span class="hljs-string">'trim'</span>)-&gt;url;

        <span class="hljs-comment">/** 修正用户提交的url */</span>
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">empty</span>($comment[<span class="hljs-string">'url'</span>])) {
            $urlParams = parse_url($comment[<span class="hljs-string">'url'</span>]);
            <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">isset</span>($urlParams[<span class="hljs-string">'scheme'</span>])) {
                $comment[<span class="hljs-string">'url'</span>] = <span class="hljs-string">'http://'</span> . $comment[<span class="hljs-string">'url'</span>];
            }
        }

        $expire = $options-&gt;gmtTime + $options-&gt;timezone + <span class="hljs-number">30</span>*<span class="hljs-number">24</span>*<span class="hljs-number">3600</span>;
        Typecho_Cookie::set(<span class="hljs-string">'__typecho_remember_author'</span>, $comment[<span class="hljs-string">'author'</span>], $expire);
        Typecho_Cookie::set(<span class="hljs-string">'__typecho_remember_mail'</span>, $comment[<span class="hljs-string">'mail'</span>], $expire);
        Typecho_Cookie::set(<span class="hljs-string">'__typecho_remember_url'</span>, $comment[<span class="hljs-string">'url'</span>], $expire);
    } <span class="hljs-keyword">else</span> {
        $comment[<span class="hljs-string">'author'</span>] = $user-&gt;screenName;
        $comment[<span class="hljs-string">'mail'</span>] = $user-&gt;mail;
        $comment[<span class="hljs-string">'url'</span>] = $user-&gt;url;

        <span class="hljs-comment">/** 记录登录用户的id */</span>
        $comment[<span class="hljs-string">'authorId'</span>] = $user-&gt;uid;
    }

    <span class="hljs-comment">/** 评论者之前须有评论通过了审核 */</span>
    <span class="hljs-keyword">if</span> (!$options-&gt;commentsRequireModeration &amp;&amp; $options-&gt;commentsWhitelist) {
        <span class="hljs-keyword">if</span> ($feedback-&gt;size($feedback-&gt;select()-&gt;where(<span class="hljs-string">'author = ? AND mail = ? AND status = ?'</span>, $comment[<span class="hljs-string">'author'</span>], $comment[<span class="hljs-string">'mail'</span>], <span class="hljs-string">'approved'</span>))) {
            $comment[<span class="hljs-string">'status'</span>] = <span class="hljs-string">'approved'</span>;
        } <span class="hljs-keyword">else</span> {
            $comment[<span class="hljs-string">'status'</span>] = <span class="hljs-string">'waiting'</span>;
        }
    }

    <span class="hljs-keyword">if</span> ($error = $validator-&gt;run($comment)) {
        $archive-&gt;response-&gt;throwJson(<span class="hljs-keyword">array</span>(<span class="hljs-string">'status'</span>=&gt;<span class="hljs-number">0</span>,<span class="hljs-string">'msg'</span>=&gt; implode(<span class="hljs-string">';'</span>,$error)));
    }

    <span class="hljs-comment">/** 添加评论 */</span>
    $commentId = $feedback-&gt;insert($comment);
    <span class="hljs-keyword">if</span>(!$commentId){
        $archive-&gt;response-&gt;throwJson(<span class="hljs-keyword">array</span>(<span class="hljs-string">'status'</span>=&gt;<span class="hljs-number">0</span>,<span class="hljs-string">'msg'</span>=&gt;_t(<span class="hljs-string">'评论失败'</span>)));
    }
    Typecho_Cookie::delete(<span class="hljs-string">'__typecho_remember_text'</span>);
    $db-&gt;fetchRow($feedback-&gt;select()-&gt;where(<span class="hljs-string">'coid = ?'</span>, $commentId)
    -&gt;limit(<span class="hljs-number">1</span>), <span class="hljs-keyword">array</span>($feedback, <span class="hljs-string">'push'</span>));
    <span class="hljs-comment">// 返回评论数据</span>
    $data = <span class="hljs-keyword">array</span>(
        <span class="hljs-string">'cid'</span> =&gt; $feedback-&gt;cid,
        <span class="hljs-string">'coid'</span> =&gt; $feedback-&gt;coid,
        <span class="hljs-string">'parent'</span> =&gt; $feedback-&gt;parent,
        <span class="hljs-string">'mail'</span> =&gt; $feedback-&gt;mail,
        <span class="hljs-string">'url'</span> =&gt; $feedback-&gt;url,
        <span class="hljs-string">'ip'</span> =&gt; $feedback-&gt;ip,
        <span class="hljs-string">'agent'</span> =&gt; $feedback-&gt;agent,
        <span class="hljs-string">'author'</span> =&gt; $feedback-&gt;author,
        <span class="hljs-string">'authorId'</span> =&gt; $feedback-&gt;authorId,
        <span class="hljs-string">'permalink'</span> =&gt; $feedback-&gt;permalink,
        <span class="hljs-string">'created'</span> =&gt; $feedback-&gt;created,
        <span class="hljs-string">'datetime'</span> =&gt; $feedback-&gt;date-&gt;format(<span class="hljs-string">'Y-m-d H:i:s'</span>),
        <span class="hljs-string">'status'</span> =&gt; $feedback-&gt;status,
    );
    <span class="hljs-comment">// 评论内容</span>
    ob_start();
    $feedback-&gt;content();
    $data[<span class="hljs-string">'content'</span>] = ob_get_clean();

    $data[<span class="hljs-string">'avatar'</span>] = Typecho_Common::gravatarUrl($data[<span class="hljs-string">'mail'</span>], <span class="hljs-number">48</span>, Helper::options()-&gt;commentsAvatarRating, <span class="hljs-keyword">NULL</span>, $archive-&gt;request-&gt;isSecure());
    $archive-&gt;response-&gt;throwJson(<span class="hljs-keyword">array</span>(<span class="hljs-string">'status'</span>=&gt;<span class="hljs-number">1</span>,<span class="hljs-string">'comment'</span>=&gt;$data));
}</code></pre><p>当已经在<code>functions.php</code>文件中添加完上述方法时，就已经可以接收ajax评论了。<br>此时我们需要修改评论表单添加的方式及提交的地址。</p><p>在<code>footer.php</code>文件中添加方法</p><pre><code class="hljs javascript"><span class="hljs-comment">// 依赖jquery,请自行加载</span>
$(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// 监听评论表单提交</span>
    $(<span class="hljs-string">'#comment-form'</span>).submit(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> form = $(<span class="hljs-keyword">this</span>), params = form.serialize();
        <span class="hljs-comment">// 添加functions.php中定义的判断参数</span>
        params += <span class="hljs-string">'&amp;themeAction=comment'</span>;
        
        <span class="hljs-comment">// 解析新评论并附加到评论列表</span>
        <span class="hljs-keyword">var</span> appendComment = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">comment</span>)</span>{
            <span class="hljs-comment">// 评论列表</span>
            <span class="hljs-keyword">var</span> el = $(<span class="hljs-string">'#comments &gt; .comment-list'</span>);
            <span class="hljs-keyword">if</span>(<span class="hljs-number">0</span> != comment.parent){
                <span class="hljs-comment">// 子评论则重新定位评论列表</span>
                <span class="hljs-keyword">var</span> el = $(<span class="hljs-string">'#comment-'</span>+comment.parent);
                <span class="hljs-comment">// 父评论不存在子评论时</span>
                <span class="hljs-keyword">if</span>(el.find(<span class="hljs-string">'.comment-children'</span>).length &lt; <span class="hljs-number">1</span>){
                    $(<span class="hljs-string">'&lt;div class="comment-children"&gt;&lt;ol class="comment-list"&gt;&lt;/ol&gt;&lt;/div&gt;'</span>).appendTo(el);
                }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(el.find(<span class="hljs-string">'.comment-children &gt; .comment-list'</span>).length &lt;<span class="hljs-number">1</span>){
                    $(<span class="hljs-string">'&lt;ol class="comment-list"&gt;&lt;/ol&gt;'</span>).appendTo(el.find(<span class="hljs-string">'.comment-children'</span>));
                }
                el = $(<span class="hljs-string">'#comment-'</span>+comment.parent).find(<span class="hljs-string">'.comment-children'</span>).find(<span class="hljs-string">'.comment-list'</span>);
            }
            <span class="hljs-keyword">if</span>(<span class="hljs-number">0</span> == el.length){
                $(<span class="hljs-string">'&lt;ol class="comment-list"&gt;&lt;/ol&gt;'</span>).appendTo($(<span class="hljs-string">'#comments'</span>));
                el = $(<span class="hljs-string">'#comments &gt; .comment-list'</span>);
            }
                        <span class="hljs-comment">// 评论html模板，根据具体主题定制</span>
            <span class="hljs-keyword">var</span> html = <span class="hljs-string">'&lt;li id="comment-{coid}" class="comment-body comment-ajax"&gt;&lt;div class="comment-author"&gt;&lt;span&gt;&lt;img class="avatar" src="{avatar}" alt="{author}" width="32" height="32"&gt;&lt;/span&gt;&lt;cite class="fn"&gt;{author}&lt;/cite&gt;&lt;/div&gt;&lt;div class="comment-meta"&gt;&lt;a href="{permalink}"&gt;&lt;time&gt;{datetime}&lt;/time&gt;&lt;/a&gt;&lt;/div&gt;&lt;div class="comment-content"&gt;{content}&lt;/div&gt;&lt;/li&gt;'</span>;
            $.each(comment,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">k,v</span>)</span>{
                regExp = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'{'</span>+k+<span class="hljs-string">'}'</span>, <span class="hljs-string">'g'</span>);
                html = html.replace(regExp, v);
            });
            $(html).appendTo(el);
        }
        <span class="hljs-comment">// ajax提交评论</span>
        $.ajax({
            <span class="hljs-attr">url</span>: <span class="hljs-string">'&lt;?php $this-&gt;permalink();?&gt;'</span>,
            <span class="hljs-attr">type</span>: <span class="hljs-string">'POST'</span>,
            <span class="hljs-attr">data</span>: params,
            <span class="hljs-attr">dataType</span>: <span class="hljs-string">'json'</span>,
            <span class="hljs-attr">beforeSend</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ form.find(<span class="hljs-string">'.submit'</span>).addClass(<span class="hljs-string">'loading'</span>).html(<span class="hljs-string">'&lt;i class="icon icon-loading icon-pulse"&gt;&lt;/i&gt; 提交中...'</span>).attr(<span class="hljs-string">'disabled'</span>,<span class="hljs-string">'disabled'</span>);},
            <span class="hljs-attr">complete</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ form.find(<span class="hljs-string">'.submit'</span>).removeClass(<span class="hljs-string">'loading'</span>).html(<span class="hljs-string">'提交评论'</span>).removeAttr(<span class="hljs-string">'disabled'</span>);},
            <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>)</span>{
                <span class="hljs-keyword">if</span>(<span class="hljs-number">1</span> == result.status){
                    <span class="hljs-comment">// 新评论附加到评论列表</span>
                    appendComment(result.comment);
                    form.find(<span class="hljs-string">'textarea'</span>).val(<span class="hljs-string">''</span>);
                }<span class="hljs-keyword">else</span>{
                    <span class="hljs-comment">// 提醒错误消息</span>
                    alert(<span class="hljs-literal">undefined</span> === result.msg ? <span class="hljs-string">'&lt;?php _e('</span>评论出错!<span class="hljs-string">');?&gt;'</span> : result.msg);
                }
            },
            <span class="hljs-attr">error</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">xhr, ajaxOptions, thrownError</span>)</span>{
                alert(<span class="hljs-string">'评论失败，请重试'</span>);
            }
        });
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    });
});</code></pre><p>ajax评论需要自定义评论模板，获取使用其他方式拼接评论html。</p><p>评论form表单的提交按钮需要添加<code>class="submit"</code>或修改代码为其他自定义的class </p><p>注：需开启评论的反垃圾保护</p><p>有任何问题请留言……</p>	</div>
						<footer>
							<p>归档 标签 链接 留言 关于</p>
							<p>© 2017 山野呓语 · Typecho · 赣ICP备10004449号-5	· Theme By 山野呓语</p>
						</footer>
					</article>
				</div>
			</div>
		</section>
  </div>
</template>
<script>
	/* eslint-disable */ 
  import vNav from '@/components/Nav.vue'
  import vBanner from '@/components/Banner.vue'
  import vHeader from '@/components/Header.vue'
  // import vfooter from '@/components/footer.vue'
  // import axios from 'axios'
  export default{
    data () {
      return {
        isDarkMode: false
      }
    },
    components: {
      vNav,
      vBanner,
      vHeader
    },
    methods: {
      changeMode (...data) {
        this.isDarkMode = data[0]
      }
    }
  }
</script>
