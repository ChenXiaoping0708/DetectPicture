;//javascript file
var pic0=new Array();
pic0[0]='http://detectpic-tupian.stor.sinaapp.com/d10.jpg';
pic0[1]='http://detectpic-tupian.stor.sinaapp.com/f12.jpg';
pic0[2]='http://detectpic-tupian.stor.sinaapp.com/d2.jpg';
pic0[3]='http://detectpic-tupian.stor.sinaapp.com/f2.jpg';
pic0[4]='http://detectpic-tupian.stor.sinaapp.com/d3.jpg';
pic0[5]='http://detectpic-tupian.stor.sinaapp.com/f13.jpg';
pic0[6]='http://detectpic-tupian.stor.sinaapp.com/d11.jpg';
pic0[7]='http://detectpic-tupian.stor.sinaapp.com/f4.jpg';
pic0[8]='http://detectpic-tupian.stor.sinaapp.com/d5.jpg';
pic0[9]='http://detectpic-tupian.stor.sinaapp.com/f5.jpg';
pic0[10]='http://detectpic-tupian.stor.sinaapp.com/d6.jpg';
pic0[11]='http://detectpic-tupian.stor.sinaapp.com/f6.jpg';
pic0[12]='http://detectpic-tupian.stor.sinaapp.com/d7.jpg';
pic0[13]='http://detectpic-tupian.stor.sinaapp.com/f7.jpg';
pic0[14]='http://detectpic-tupian.stor.sinaapp.com/d8.jpg';
pic0[15]='http://detectpic-tupian.stor.sinaapp.com/f8.jpg';
pic0[16]='http://detectpic-tupian.stor.sinaapp.com/d9.jpg';
pic0[17]='http://detectpic-tupian.stor.sinaapp.com/f9.jpg';
var pic1=new Array();
pic1[0]='http://detectpic-tupian.stor.sinaapp.com/i1.jpg';
pic1[1]='http://detectpic-tupian.stor.sinaapp.com/i2.jpg';
pic1[2]='http://detectpic-tupian.stor.sinaapp.com/i3.jpg';
pic1[3]='http://detectpic-tupian.stor.sinaapp.com/i4.jpg';
pic1[4]='http://detectpic-tupian.stor.sinaapp.com/i5.jpg';
pic1[5]='http://detectpic-tupian.stor.sinaapp.com/i6.jpg';
pic1[6]='http://detectpic-tupian.stor.sinaapp.com/i7.jpg';
pic1[7]='http://detectpic-tupian.stor.sinaapp.com/i8.jpg';
pic1[8]='http://detectpic-tupian.stor.sinaapp.com/i9.jpg';
pic1[9]='http://detectpic-tupian.stor.sinaapp.com/i10.jpg';
pic1[10]='http://detectpic-tupian.stor.sinaapp.com/i11.jpg';
pic1[11]='http://detectpic-tupian.stor.sinaapp.com/i12.jpg';
pic1[12]='http://detectpic-tupian.stor.sinaapp.com/i13.jpg';
pic1[13]='http://detectpic-tupian.stor.sinaapp.com/i14.jpg';
pic1[14]='http://detectpic-tupian.stor.sinaapp.com/i5.jpg';
pic1[15]='http://detectpic-tupian.stor.sinaapp.com/i16.jpg';
pic1[16]='http://detectpic-tupian.stor.sinaapp.com/i17.jpg';
pic1[17]='http://detectpic-tupian.stor.sinaapp.com/i18.jpg';
$(document).ready(function(e) {
	$("#fileDragArea").text("请添加正脸照(可以单人照或多人照）");
	html='<h3>对称脸实验室</br></h3><h4>如果左脸和右脸长得一样会是怎样呢？</br></h4><p>请添加正脸照(可以单人照或多人照）</p>';
	$("#rightinfo-single").html(html);
	requesttype='symmetry';
	$("#duichen").addClass('selebg');
  $("#findsb").click(function(){
		$("#showimage").attr('src','http://detectpic-tupian.stor.sinaapp.com/init.png');
		findsbinit();
		addpic();
	});
	$("#selectpic").click(selectpicinit);
	addpic();
	for(var i=0;i<18;i++){
		(function(){
			var thisi=i;
			var picid='wallpic'+thisi;
		  document.getElementById(picid).onclick=function(){
				for(var i=0;i<lastfacenum;i++){
		    	var deleid='face'+i;
		    	$("#"+deleid).remove();
	    	}
		  	picurl=document.getElementById(picid).src;
				$("#showimage").attr('src',picurl);
				$("#selectpic").css('display','block');
			};})(i)
	}
	$("#clfindsb").click(function(){
		$("#showimage").attr('src','http://detectpic-tupian.stor.sinaapp.com/init.png');
		findsbinit();
		addpic();
	});
	$("#facedetect").click(function(){
		$("#showimage").attr('src','http://detectpic-tupian.stor.sinaapp.com/init.png');
		facedetectinit();
		addpic();
	});
	$("#cldetect").click(function(){
		$("#showimage").attr('src','http://detectpic-tupian.stor.sinaapp.com/init.png');
		facedetectinit();
		addpic();
	});
	$("#picstylespan").click(function(){
		$("#showimage").attr('src','http://detectpic-tupian.stor.sinaapp.com/init.png');
		picstylespaninit();
		addpic();
	});
	$("#clhuafeng").click(function(){
		$("#showimage").attr('src','http://detectpic-tupian.stor.sinaapp.com/init.png');
		fudiaoinit();
		addpic();
	});
	$("#facecomp").click(function(){
		$("#showimage").attr('src','http://detectpic-tupian.stor.sinaapp.com/init.png');
		facecompinit();
		addpic();
	});
	$("#clsimilar").click(function(){
		$("#showimage").attr('src','http://detectpic-tupian.stor.sinaapp.com/init.png');
		facecompinit();
		addpic();
	});
	$("#randomchoose").click(function(){
		$("#showimage").attr('src','http://detectpic-tupian.stor.sinaapp.com/init.png');
		randomchooseinit();
		addpic();
	});
	$("#clrandom").click(function(){
		$("#showimage").attr('src','http://detectpic-tupian.stor.sinaapp.com/init.png');
		randomchooseinit();
		addpic();
	});
	$("#picfaxian").click(function(){
		$("#showimage").attr('src','http://detectpic-tupian.stor.sinaapp.com/init.png');
		picfaxianinit();
		addpicfaxian();
	});
	$("#clfaxian").click(function(){
		$("#showimage").attr('src','http://detectpic-tupian.stor.sinaapp.com/init.png');
		picfaxianinit();
		addpicfaxian();
	});
	$("#duichen").click(function(){
		$("#showimage").attr('src','http://detectpic-tupian.stor.sinaapp.com/init.png');
		duicheninit();
		addpic();
	});
	$("#clduichen").click(function(){
		$("#showimage").attr('src','http://detectpic-tupian.stor.sinaapp.com/init.png');
		duicheninit();
		addpic();
	});
	$("#sumiao").click(function(){
		$("#showimage").attr('src','http://detectpic-tupian.stor.sinaapp.com/init.png');
		sumiaoinit();
		addpic();
	});
	$("#clsumiao").click(function(){
		$("#showimage").attr('src','http://detectpic-tupian.stor.sinaapp.com/init.png');
		sumiaoinit();
		addpic();
	});
	$("#fudiao").click(function(){
		$("#showimage").attr('src','http://detectpic-tupian.stor.sinaapp.com/init.png');
		fudiaoinit();
		addpic();
	});
	$("#clfudiao").click(function(){
		$("#showimage").attr('src','http://detectpic-tupian.stor.sinaapp.com/init.png');
		fudiaoinit();
		addpic();
	});
});

function selectpicinit(){
		$("#selectpic").css('display','none');
		var html='<h3>正在连接服务器进行检测，需要一点点时间，请耐心等候！</br></h3>';
			$("#rightinfo-single").html(html);
				if(requesttype=='find'){
			if(doubleid==0){
				url0=picurl;
				doubleid=1;
				html='<h3>请添加一张单人图片作为匹配的目标图片</br></h3>';
				$("#rightinfo-single").html(html);
			}else if(doubleid==1){
				url1=picurl;
				doubleid=0;
				html='';
				html='<div class="img_drop"> <img src="'+url0+'" border="0" width="0" height="0" onload="AutoResizeImage(260,320,this)"/>&nbsp;&nbsp;<img src="'+url1+'" border="0" width="0" height="0" onload="AutoResizeImage(260,320,this)"/></div><p id="twowait" style="display:block;">正在连接服务器，请稍候......</p>';
				$("#rightinfo-single").html(html);		
				$.ajax({
				type:"POST",   
				url:"/tupian/sample.php",
				dataType:"json",
				data:{urladd:url0,comurl:url1,request:'find'},
				success: function(datas){
					if(datas.codes==0){
				html+='<div class="row" style="border-top:1px dotted gray;padding-top:15px;"><div class="col-sm-2"><img src="'+datas.data.url+'"></div><div class="col-sm-1"></div><div class="col-sm-8">'+'<p>相似程度：'+datas.similarity+'</p></div></div>';
					}else{html+='<h4>'+datas.data+'</h4>';}
				$("#rightinfo-single").html(html);
				$("#twowait").css('display','none');
				},
				error:function(){
					html+='<h3>出错了，请确保第一张图片是集体照，第二张图片是单人照。请重新按照顺序加入图片进行检测!';
					$("#rightinfo-single").html(html);
					$("#twowait").css('display','none');
				}
				});
			}
		}
		if(requesttype=='bonus'){
			$.ajax({
			type:"POST",   
			url:"/tupian/sample.php",
			dataType:"json",
			data:{urladd:picurl,request:'bonus'},
			success:function(datas){
				if(datas.codes==0){
				lastfacenum=datas.facenum;
				var picwidth=$("#showimage").width();
				var picheight=$("#showimage").height();
				var html='<h3>点兵点将，看我点到谁——</br></h3>';
				html+='<div class="row" style="border-top:1px dotted gray;padding-top:15px;"><div class="col-sm-4"></div><div class="col-sm-4"><img src="'+datas.data.url+'"></div><div class="col-sm-4"></div>';
				}else{
					html+='<h4>'+datas.data+'</h4>';}
				$("#rightinfo-single").html(html);
			},
			error:function(){
				var html='<h3>连接服务器失败，请重新尝试！</br></h3>';
				$("#rightinfo-single").html(html);
			}      
		})
		}
		if(requesttype=='compare'){
			if(doubleid==0){
				url0=picurl;
				doubleid=1;
				html='<h3>请继续添加第二张人脸图片</br></h3>';
				$("#rightinfo-single").html(html);
			}else if(doubleid==1){
				url1=picurl;
				doubleid=0;
				html='';
				html='<div class="img_drop"> <img src="'+url0+'" border="0" width="0" height="0" onload="AutoResizeImage(260,320,this)"/>&nbsp;&nbsp;<img src="'+url1+'" border="0" width="0" height="0" onload="AutoResizeImage(260,320,this)"/></div><p id="twowait" style="display:block;">正在连接服务器，请稍候......</p>';
				$("#rightinfo-single").html(html);		
				$.ajax({
				type:"POST",   
				url:"/tupian/sample.php",
				dataType:"json",
				data:{url1:url0,url2:url1,request:'compare'},
				success: function(datas){
					if(datas.codes==0){
				html+='<div class="row" style="border-top:1px dotted gray;padding-top:15px;"><p>相似度：'+datas.data+'</p></div>';
					}else{html+='<h4>'+datas.data+'</h4>';}
				$("#rightinfo-single").html(html);
				$("#twowait").css('display','none');
				},
				error:function(){
					html+='<h3>出错了，请确添加两张人脸照片。请重新按照顺序加入图片进行检测!';
					$("#rightinfo-single").html(html);
					$("#twowait").css('display','none');
				}
				});
			}
		}
		if(requesttype=='picturetag'){
			$.ajax({
			type:"POST",   
			url:"/tupian/sample.php",
			dataType:"json",
			data:{urladd:picurl,request:'picturetag'},
			success:function(datas){
				if(datas.codes==0){
				html='<h3>图片中隐藏的玄机</br></h3>';
				for(var i=0;i<datas.tags;i++){
					html+='<div class="row"><div class="col-sm-1"></div><div class="col-sm-5">玄机'+(i+1)+':'+datas.data[i].tag_name+'</div><div class="col-sm-4">置信度：'+datas.data[i].tag_confidence+'</div></div>';
				}
				}else{
					html+='<h4>'+datas.data+'</h4>';}
				$("#rightinfo-single").html(html);
			},
			error:function(){
				var html='<h3>连接服务器失败，请重新尝试！</br></h3>';
				$("#rightinfo-single").html(html);
			}      
			});        
		}
		if(requesttype=='symmetry'){
			$.ajax({
				type:'POST',
				url:"/tupian/sample.php",
				dataType:"json",
				data:{urladd:picurl,request:'symmetry'},
				success: function(datas){
					if(datas.codes==0){
					html='<h3>对称脸实验室</br></h3>';
					for(var i=0;i<datas.facenum;i++){
						html+='<div class="row"><div class="col-sm-3"><span style="text-align:center;">脸部原图</span></br><img style="width:170px;height:190px;" src="'+datas.data[i].url_old+'"/></div><div class="col-sm-1"></div><div class="col-sm-3"><span style="text-align:center;">左对称脸</span></br><img style="width:170px;height:190px;" src="'+datas.data[i].url_l+'"/></div><div class="col-sm-1"></div><div class="col-sm-3"><span style="text-align:center;">右对称脸</span></br><img style="width:170px;height:190px;" src="'+datas.data[i].url_r+'"/></div></div>';
					}
					}else{
						html+='<h4>'+datas.data+'</h4>';}
					$("#rightinfo-single").html(html);
				},
				error:function(){
					var html='<h3>连接服务器失败，请重新尝试！</br></h3>';
					$("#rightinfo-single").html(html);
				}
			});
		}
		if(requesttype=='sumiao'){
			html='<h3>素描画风转换室</br></h3>';
			html+='<img src="'+picurl+'" border="0" width="0" height="0" onload="AutoResizeImage(560,330,this)" style="-webkit-filter: grayscale(100%) contrast(2500%);"/>';
	    $("#rightinfo-single").html(html);
		}
		if(requesttype=='fudiao'){
			$.ajax({
				type:"POST",
				url:"/tupian/sample.php",
				dataType:"json",
				data:{urladd:picurl,request:'fudiao'},
				success: function(datas){
					if(datas.codes==0){
					html='<h3>浮雕画风转换室</br></h3>';
					html+='<img src="'+datas.url+'" border="0" width="0" height="0" onload="AutoResizeImage(560,330,this)"/>';
					}else{
						html+='<h4>'+datas.data+'</h4>';}
					$("#rightinfo-single").html(html);
				},
				error:function(){
					var html='<h3>连接服务器失败，请重新尝试！</br></h3>';
					$("#rightinfo-single").html(html);
				}
			});
		}
		if(requesttype=='detect'){
			$.ajax({
			type:"POST",   
			url:"/tupian/sample.php",
			dataType:"json",
			data:{urladd:picurl,request:'detect'},
			success:function(datas){
				for(var i=0;i<lastfacenum;i++){
					var deleid='face'+i;
					$("#"+deleid).remove();
				}
				lastfacenum=datas.facenum;
				var picwidth=$("#showimage").width();
				var picheight=$("#showimage").height();
				var html='<h3>检测结果</br></h3>';
				if(datas.codes==0){
				for(var i=0;i<datas.facenum;i++){
					var divid='face'+i;
					var node=$("<div id='"+divid+"' class='face' style='display:none;'></div>");   
					$("#imgfather").append(node);
					$("#"+divid).css('top',picheight*datas.data[i].y);
					$("#"+divid).css('left',picwidth*datas.data[i].x);
					$("#"+divid).css('display','block');
					$("#"+divid).width(picwidth*datas.data[i].width);
					$("#"+divid).height(picheight*datas.data[i].height);
					var glasses;
					if(datas.data[i].glass){
						glasses="是";
					}else{
						glasses="否";
					}
					html+='<div class="row" style="border-top:1px dotted gray;padding-top:15px;"><div class="col-sm-2"><img src="'+datas.data[i].url+'"></div><div class="col-sm-1"></div><div class="col-sm-8">'+'<p>年龄：'+datas.data[i].age+'</p><p>魅力值：'+datas.data[i].beauty+'</p><p>脸部表情：'+datas.data[i].expression+'</p><p>性别：'+datas.data[i].gender+'</p><p>是否戴眼镜：'+glasses+'</div></div>';
				}
				}else{
					html+='<h4>'+datas.data+'</h4>';
				}
				$("#rightinfo-single").html(html);
			},
			error:function(){
				var html='<h3>连接服务器失败，请重新尝试！</br></h3>';
				$("#rightinfo-single").html(html);
			}      
		});
		}
	}
function fudiaoinit(){
		$("#single-list li").removeClass('selebg');
		$("#fudiao").addClass('selebg');
		for(var i=0;i<lastfacenum;i++){
			var deleid='face'+i;
			$("#"+deleid).remove();
		}
		$("#fileDragArea").text("请添加需要转换画风的图片");
		html='<h3>浮雕画风转换室</br></h3><p>请添加需要转换浮雕画风的图片</p>';
		$("#rightinfo-single").html(html);
		requesttype="fudiao";
	}
function sumiaoinit(){
		$("#single-list li").removeClass('selebg');
		$("#sumiao").addClass('selebg');
		for(var i=0;i<lastfacenum;i++){
			var deleid='face'+i;
			$("#"+deleid).remove();
		}
		$("#fileDragArea").text("请添加需要转换画风的图片");
		html='<h3>素描画风转换室</br></h3><p>请添加需要转换素描画风的图片</p>';
		$("#rightinfo-single").html(html);
		requesttype='sumiao';
	}
function findsbinit(){
		$("#single-list li").removeClass('selebg');
		$("#findsb").addClass('selebg');
		$("#fileDragArea").text("第一张图片请选择多人集体照，第二张图片选择单人照作为目标图片，我们将在集体照中为您找出最像第二张图片中的人。");
		html='<h3>找到最像你的那个ta</br></h3><p>第一张图片请选择多人集体照，第二张图片选择单人照作为目标图片，我们将在集体照中为您找出最像第二张图片中的人。</p>';
		$("#rightinfo-single").html(html);
		requesttype='find';
		doubleid=0;
		for(var i=0;i<lastfacenum;i++){
			var deleid='face'+i;
			$("#"+deleid).remove();
		}
	}
function duicheninit(){
		$("#single-list li").removeClass('selebg');
		$("#duichen").addClass('selebg');
		for(var i=0;i<lastfacenum;i++){
			var deleid='face'+i;
			$("#"+deleid).remove();
		}
		$("#fileDragArea").text("请添加正脸照(可以单人照或多人照）");
		html='<h3>对称脸实验室</br></h3><h4>如果左脸和右脸长得一样会是怎样呢？</br></h4><p>请添加正脸照(可以单人照或多人照）</p>';
		$("#rightinfo-single").html(html);
		requesttype='symmetry';
	}
function picfaxianinit(){
		$("#single-list li").removeClass('selebg');
		$("#picfaxian").addClass('selebg');
		for(var i=0;i<lastfacenum;i++){
			var deleid='face'+i;
			$("#"+deleid).remove();
		}
		$("#fileDragArea").text("请随意添加一张进行大发现的图片");
		html='<h3>图片中隐藏的玄机</br></h3><p>请随意添加一张进行大发现的图片</p>';
		$("#rightinfo-single").html(html);
		requesttype='picturetag';
	}
function randomchooseinit(){
		$("#single-list li").removeClass('selebg');
		$("#randomchoose").addClass('selebg');
		for(var i=0;i<lastfacenum;i++){
			var deleid='face'+i;
			$("#"+deleid).remove();
		}
		$("#fileDragArea").text("请添加一张多人集体照片");
		html='<h3>点兵点将随机圈人</br></h3><p>请添加一张多人集体照片进行随机圈人</p>';
		$("#rightinfo-single").html(html);
		requesttype='bonus';
	}
function facecompinit(){
		$("#single-list li").removeClass('selebg');
		$("#facecomp").addClass('selebg');
		for(var i=0;i<lastfacenum;i++){
			var deleid='face'+i;
			$("#"+deleid).remove();
		}
		$("#fileDragArea").text("请依次添加两张人脸图片");
		html='<h3>人脸相似度检测结果</br></h3><p>请依次添加两张进行相似度检测的人脸图片</p>';
		$("#rightinfo-single").html(html);
		requesttype='compare';
		doubleid=0;
	}
function facedetectinit(){
	$("#single-list li").removeClass('selebg');
	$("#facedetect").addClass('selebg');
	for(var i=0;i<lastfacenum;i++){
		var deleid='face'+i;
		$("#"+deleid).remove();
	}
	$("#fileDragArea").text("或者将图片拖拽至此处");
	html='<h3>检测结果</br></h3><p>请添加人脸检测图片（可单人可多人）</p>';
	$("#rightinfo-single").html(html);
	requesttype='detect';
}
function picstylespaninit(){
	for(var i=0;i<lastfacenum;i++){
		var deleid='face'+i;
		$("#"+deleid).remove();
	}
	if($("#sub-list").css('display')=='none'){
		$("#sub-list").css('display','block');
	}else{
		$("#sub-list").css('display','none');
	}
}
function addpic(){
	for(var i=0;i<18;i++){
	  var picid='wallpic'+i;
		$("#"+picid).attr('src',pic0[i]);
	}
}
function addpicfaxian(){
	for(var i=0;i<18;i++){
	  var picid='wallpic'+i;
		$("#"+picid).attr('src',pic1[i]);
	}
}
