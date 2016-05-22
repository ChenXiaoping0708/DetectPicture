var url='';
var lastfacenum=1;
var requesttype='duichen';
var doubleid=0;
var url0,url1;
var picwallflag=0;
var picurl='';
var params = {
	fileInput: $("#fileImage").get(0),
	dragDrop: $("#fileDragArea").get(0),
	upButton: $("#fileSubmit").get(0),
	url: $("#uploadForm").attr("action"),
	filter: function(files) {
		var arrFiles = [];
		for (var i = 0, file; file = files[i]; i++) {
			if (file.type.indexOf("image") == 0) {
				if (file.size >= 512000) {
					alert('您这张"'+ file.name +'"图片大小过大，应小于500k');	
				} else {
					arrFiles.push(file);	
				}			
			} else {
				alert('文件"' + file.name + '"不是图片。');	
			}
		}
		return arrFiles;
	},
	onSelect: function(files) {
		var html = '', i = 0;
		$("#preview").html('<div class="upload_loading"></div>');
		var funAppendImage = function() {
			file = files[i];
			if (file) {
				var reader = new FileReader()
				reader.onload = function(e) {
					html = '<div id="uploadList_'+ i +'" class="upload_append_list"><p><strong>' + file.name + '</strong>'+ 
						'<a href="javascript:" class="upload_delete" title="删除" data-index="'+ i +'">删除</a><br />' +
						'<img id="uploadImage_' + i + '" src="' + e.target.result + '" class="upload_image" /></p>'+ 
						'<span id="uploadProgress_' + i + '" class="upload_progress"></span>' +
					'</div>';
					
					i++;
					$("#fileDragArea").css('display','none');
					funAppendImage();
				}
				reader.readAsDataURL(file);
			} else {
				$("#preview").html(html);
				if (html) {
					//删除方法
					$(".upload_delete").click(function() {
						ZXXFILE.funDeleteFile(files[parseInt($(this).attr("data-index"))]);
						$("#fileSubmit").hide();
						$("#fileDragArea").css('display','block');
						return false;	
					});
					//提交按钮显示
					$("#fileSubmit").show();	
				} else {
					//提交按钮隐藏
					$("#fileSubmit").hide();	
				}
			}
		};
		funAppendImage();		
	},
	onDelete: function(file) {
		$("#uploadList_" + file.index).fadeOut();
	},
	onDragOver: function() {
		$(this).addClass("upload_drag_hover");
	},
	onDragLeave: function() {
		$(this).removeClass("upload_drag_hover");
	},
	onProgress: function(file, loaded, total) {
		var eleProgress = $("#uploadProgress_" + file.index), percent = (loaded / total * 100).toFixed(2) + '%';
		eleProgress.show().html(percent);
	},
	onSuccess: function(file, response) {
		//$("#uploadInf").append("<p>上传成功，图片地址是：" + response + "</p>");
		url=response;
		srcurl='http://detectpic-picture.stor.sinaapp.com/'+url;
		$("#showimage").attr('src',srcurl);
		if(requesttype=='find'){
			if(doubleid==0){
				url0=srcurl;
				doubleid=1;
				html='<h3>请添加一张单人图片作为匹配的目标图片</br></h3>';
				$("#rightinfo-single").html(html);
			}else if(doubleid==1){
				url1=srcurl;
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
					}else{
						html+='<h4>'+datas.data+'</h4>';
					}
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
			data:{urladd:srcurl,request:'bonus'},
			success:function(datas){
				if(datas.codes==0){
				lastfacenum=datas.facenum;
				var picwidth=$("#showimage").width();
				var picheight=$("#showimage").height();
				var html='<h3>点兵点将，看我点到谁——</br></h3>';
				html+='<div class="row" style="border-top:1px dotted gray;padding-top:15px;"><div class="col-sm-4"></div><div class="col-sm-4"><img src="'+datas.data.url+'"></div><div class="col-sm-4"></div>';
				
				}else{
					html+='<h4>'+datas.data+'</h4>';
				}$("#rightinfo-single").html(html);
			},
			error:function(){
				var html='<h3>连接服务器失败，请重新尝试！</br></h3>';
				$("#rightinfo-single").html(html);
			}      
		})
		}
		if(requesttype=='compare'){
			if(doubleid==0){
				url0=srcurl;
				doubleid=1;
				html='<h3>请继续添加第二张人脸图片</br></h3>';
				$("#rightinfo-single").html(html);
			}else if(doubleid==1){
				url1=srcurl;
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
				
			
					}else{
						html+='<h4>'+datas.data+'</h4>';
					}$("#rightinfo-single").html(html);
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
			data:{urladd:srcurl,request:'picturetag'},
			success:function(datas){
				if(datas.codes==0){
				for(var i=0;i<datas.tags;i++){
					html+='<div class="row"><div class="col-sm-1"></div><div class="col-sm-5">玄机'+(i+1)+':'+datas.data[i].tag_name+'</div><div class="col-sm-4">置信度：'+datas.data[i].tag_confidence+'</div></div>';
				}
				
				}else{
					html+='<h4>'+datas.data+'</h4>';
				}$("#rightinfo-single").html(html);
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
				data:{urladd:srcurl,request:'symmetry'},
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
			html+='<img src="'+srcurl+'" border="0" width="0" height="0" onload="AutoResizeImage(560,330,this)" style="-webkit-filter: grayscale(100%) contrast(2500%);"/>';
	    $("#rightinfo-single").html(html);
		}
		if(requesttype=='fudiao'){
			$.ajax({
				type:"POST",
				url:"/tupian/sample.php",
				dataType:"json",
				data:{urladd:srcurl,request:'fudiao'},
				success: function(datas){
					if(datas.codes==0){
					html='<h3>浮雕画风转换室</br></h3>';
					html+='<img src="'+datas.url+'" border="0" width="0" height="0" onload="AutoResizeImage(560,330,this)"/>';
					}else{html+='<h4>'+datas.data+'</h4>';
					}
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
			data:{urladd:srcurl,request:'detect'},
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
	},
	onFailure: function(file) {
		//$("#uploadInf").append("<p>图片" + file.name + "连接服务器失败！</p>");	
		$("#uploadImage_" + file.index).css("opacity", 0.2);
	},
	onComplete: function() {
		//提交按钮隐藏
		$("#fileSubmit").hide();
		//file控件value置空
		$("#fileImage").val("");
		//$("#uploadInf").append("<p>当前图片全部完毕，可继续添加上传。</p>");
	}
};

ZXXFILE = $.extend(ZXXFILE, params);
ZXXFILE.init();
