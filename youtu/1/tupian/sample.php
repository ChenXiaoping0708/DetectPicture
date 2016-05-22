
<?php
require ('./include.php');
use TencentYoutuyun\Youtu;
use TencentYoutuyun\Conf;
use TencentYoutuyun\Auth;

// 设置APP 鉴权信息
$appid = '1001621';
$secretId = 'AKIDutE85UZcGJwulrqNIh9vh5bu3FikFAW7';
$secretKey = 'jmRDSuPBRHXUmkWvdUrT4VwbiomJE9NA';
$userid = '395285655';

Conf::setAppInfo ( $appid, $secretId, $secretKey, $userid, Conf::API_YOUTU_END_POINT );
$request = $_POST ['request'];

switch ($request) {
	case 'detect' :
		{
			$pname = array ();
			if (isset ( $_POST ['urladd'] )) {
				$urladd = $_POST ['urladd'];
				$url_res = YouTu::detectfaceurl ( $urladd, 0 );
				$info = getimagesize ( $urladd );
				for($j = 0; $j < count ( $url_res ['face'] ); $j ++) {
					if ($info [2] == 2) {
						$filename = $urladd;
						$im = imagecreatefromjpeg ( $filename );
						$new_img_width = 100;
						$new_img_height = 100;
						$newim = imagecreatetruecolor ( $new_img_width, $new_img_height );
						imagecopyresampled ( $newim, $im, 0, 0, $url_res ['face'] [$j] ['x'], 
								$url_res ['face'] [$j] ['y'],
								$new_img_width, $new_img_height,$url_res ['face'] [$j] ['width'], 
								$url_res ['face'] [$j] ['height'] );
						// $file=imagejpeg($newim,' ',100);
						$pname [$j] = time () . "$j" . '.jpg';
						$s = new SaeStorage ();
						ob_start ();
						imagejpeg ( $newim );
						$imgstr = ob_get_contents ();
						$s->write ( 'picture', "$pname[$j]", $imgstr );
						ob_end_clean ();
						imagedestroy ( $newim );
						imagedestroy ( $im );
					} else if ($info [2] == 3) {
						$filename = $urladd;
						$im = imagecreatefrompng ( $filename );
						$new_img_width = 100;
						$new_img_height = 100;
						$newim = imagecreatetruecolor ( $new_img_width, $new_img_height );
						imagecopyresampled ( $newim, $im, 0, 0, $url_res ['face'] [$j] ['x'], 
								$url_res ['face'] [$j] ['y'] , $new_img_width, $new_img_height, 
								$url_res ['face'] [$j] ['width'], $url_res ['face'] [$j] ['height']);
						// $file=imagejpeg($newim,' ',100);
						$pname [$j] = time () . "$j" . '.png';
						$s = new SaeStorage ();
						ob_start ();
						imagepng ( $newim );
						$imgstr = ob_get_contents ();
						$s->write ( 'picture', "$pname[$j]", $imgstr );
						ob_end_clean ();
						imagedestroy ( $newim );
						imagedestroy ( $im );
					}
				}
				if (count ( $url_res ) == 6) {
					$code = $url_res ['errorcode'];
					if ($code == 0) {
						$face_num = count ( $url_res ['face'] );
						$data = $url_res ['face'];
						for($i = 0; $i < $face_num; $i ++) {
							$data [$i] ['width'] = $data [$i] ['width'] / $info [0];
							$data [$i] ['height'] = $data [$i] ['height'] / $info [1];
							$data [$i] ['x'] = $data [$i] ['x'] / $info [0];
							$data [$i] ['y'] = $data [$i] ['y'] / $info [1];
							$data [$i] ['url'] = "http://detectpic-picture.stor.sinaapp.com/$pname[$i]";
							if ($data [$i] ['gender'] < 50)
								$data [$i] ['gender'] = '女';
							else
								$data [$i] ['gender'] = '男';
							if ($data [$i] ['expression'] <= 33)
								$data [$i] ['expression'] = '正常';
							else if ($data [$i] ['expression'] <= 66)
								$data [$i] ['expression'] = '微笑';
							else
								$data [$i] ['expression'] = '大笑';
						}
						$return = array (
								'codes' => $code,
								'facenum' => $face_num,
								'data' => $data 
						);
						echo json_encode ( $return );
					} else {
						$face_num = 0;
						$data = $url_res ['errormsg'];
						$return = array (
								'codes' => $code,
								'facenum' => $face_num,
								'data' => $data 
						);
						echo json_encode ( $return );
					}
				} else if (count ( $url_res ) == 4) {
					$code = $url_res ['errorcode'];
					$face_num = 0;
					$data = $url_res ['errormsg'];
					$return = array (
							'codes' => $code,
							'facenum' => $face_num,
							'data' => $data 
					);
					echo json_encode ( $return );
				}
			} else {
				$return = array (
						'codes' => 200,
						'facenum' => 0,
						'data' => '未选择图片' 
				);
				echo json_encode ( $return );
			}
		}
		break;
	case 'compare' :
		{
			if (isset ( $_POST ['url1'] ) && isset ( $_POST ['url2'] )) {
				$url1 = $_POST ['url1'];
				$url2 = $_POST ['url2'];
				$res = YouTu::facecompareurl ( $url1, $url2 );
				if ($res == 'UNKOWN') {
					$return = array (
							'codes' => 404,
							'data' => '出错' 
					);
					echo json_encode ( $return );
				}
				if ($res ['errorcode'] == 0) {
					$return = array (
							'codes' => 0,
							'data' => $res ['similarity'] 
					);
					echo json_encode ( $return );
				} else {
					$return = array (
							'codes' => $res ['errorcode'],
							'data' => $res ['errormsg'] 
					);
					echo json_encode ( $return );
				}
			} else {
				$return = array (
						'codes' => 400,
						'data' => '未选择图片' 
				);
				echo json_encode ( $return );
			}
		}
		break;
	case 'find' :
		{
			$fpname = array ();
			if (isset ( $_POST ['urladd'] ))
				if (isset ( $_POST ['comurl'] )) {
					$urladd = $_POST ['urladd'];
					$comurl = $_POST ['comurl'];
					$url_res = YouTu::detectfaceurl ( $urladd, 0 );
					if (count ( $url_res ) == 4) {
						$return = array (
								'codes' => 400,
								'similarity' => 0,
								'data' => '未检测到人脸' 
						);
						echo json_encode ( $return );
					}
					$info = getimagesize ( $urladd );
					$max = 0;
					$most = 0;
					for($j = 0; $j < count ( $url_res ['face'] ); $j ++) {
						if ($info [2] == 2) {
							$fpname [$j] = time () . "$j" . '.jpg';
							$filename = $urladd;
							$im = imagecreatefromjpeg ( $filename );
							$new_img_width = 100;
							$new_img_height = 100;
							$newim = imagecreatetruecolor ( $new_img_width, $new_img_height );
							imagecopyresampled ( $newim, $im, 0, 0, $url_res ['face'] [$j] ['x'] - 5, 
									$url_res ['face'] [$j] ['y'] - 5, $new_img_width, $new_img_height, 
									$url_res ['face'] [$j] ['width'] + $url_res ['face'] [$j] ['width'], 
									$url_res ['face'] [$j] ['height'] + $url_res ['face'] [$j] ['height'] );
							// $file=imagejpeg($newim,' ',100);
							$s = new SaeStorage ();
							ob_start ();
							imagejpeg ( $newim );
							$imgstr = ob_get_contents ();
							$s->write ( 'picture', "$fpname[$j]", $imgstr );
							ob_end_clean ();
							$sim = YouTu::facecompareurl ( "http://detectpic-picture.stor.sinaapp.com/$fpname[$j]", "$comurl" );
							if ($sim ['similarity'] > $max) {
								$max = $sim ['similarity'];
								$most = $j;
							}
							imagedestroy ( $newim );
							imagedestroy ( $im );
						} else if ($info [2] == 3) {
							$fpname [$j] = time () . "$j" . '.png';
							$filename = $urladd;
							$im = imagecreatefrompng ( $filename );
							$new_img_width = 100;
							$new_img_height = 100;
							$newim = imagecreatetruecolor ( $new_img_width, $new_img_height );
							imagecopyresampled ( $newim, $im, 0, 0, $url_res ['face'] [$j] ['x'] - 5,
									 $url_res ['face'] [$j] ['y'] - 5, $new_img_width, 
									$new_img_height, $url_res ['face'] [$j] ['width'] 
									+ $url_res ['face'] [$j] ['width'], $url_res ['face'] [$j] ['height'] + 
									$url_res ['face'] [$j] ['height'] );
							// $file=imagejpeg($newim,' ',100);
							$s = new SaeStorage ();
							ob_start ();
							imagepng ( $newim );
							$imgstr = ob_get_contents ();
							$s->write ( 'picture', "$fpname[$j]", $imgstr );
							ob_end_clean ();
							$sim = YouTu::facecompareurl ( "http://detectpic-picture.stor.sinaapp.com/$fpname[$j]", "$comurl" );
							if ($sim ['similarity'] > $max) {
								$max = $sim ['similarity'];
								$most = $j;
							}
							imagedestroy ( $newim );
							imagedestroy ( $im );
						}
					}
					if ($max == 0) {
						$return = array (
								'codes' => 404,
								'similarity' => 0,
								'data' => '出错' 
						);
						echo json_encode ( $return );
					} else {
						if ($info [2] == 2) {
							$filename = $urladd;
							$im = imagecreatefromjpeg ( $filename );
							$new_img_width = 100;
							$new_img_height = 100;
							$newim = imagecreatetruecolor ( $new_img_width, $new_img_height );
							imagecopyresampled ( $newim, $im, 0, 0, $url_res ['face'] [$most] ['x'], 
									$url_res ['face'] [$most] ['y'], $new_img_width, $new_img_height, 
									$url_res ['face'] [$most] ['width'], $url_res ['face'] [$most] ['height'] );
							// $file=imagejpeg($newim,' ',100);
							$pic = time () . '.jpg';
							$s = new SaeStorage ();
							ob_start ();
							imagejpeg ( $newim );
							$imgstr = ob_get_contents ();
							$s->write ( 'picture', "$pic", $imgstr );
							ob_end_clean ();
							imagedestroy ( $newim );
							imagedestroy ( $im );
						} else if ($info [2] == 3) {
							$filename = $urladd;
							$im = imagecreatefrompng ( $filename );
							$new_img_width = 100;
							$new_img_height = 100;
							$newim = imagecreatetruecolor ( $new_img_width, $new_img_height );
							imagecopyresampled ( $newim, $im, 0, 0, $url_res ['face'] [$most] ['x'], 
									$url_res ['face'] [$most] ['y'], $new_img_width, $new_img_height, 
									$url_res ['face'] [$most] ['width'], $url_res ['face'] [$most] ['height'] );
							// $file=imagejpeg($newim,' ',100);
							$pic = time () . '.png';
							$s = new SaeStorage ();
							ob_start ();
							imagepng ( $newim );
							$imgstr = ob_get_contents ();
							$s->write ( 'picture', "$pic", $imgstr );
							ob_end_clean ();
							imagedestroy ( $newim );
							imagedestroy ( $im );
						}
						$data = $url_res ['face'] [$most];
						$data ['width'] = $data ['width'] / $info [0];
						$data ['height'] = $data ['height'] / $info [1];
						$data ['x'] = $data ['x'] / $info [0];
						$data ['y'] = $data ['y'] / $info [1];
						$data ['url'] = "http://detectpic-picture.stor.sinaapp.com/$pic";
						if ($data ['gender'] < 50)
							$data ['gender'] = '女';
						else
							$data ['gender'] = '男';
						if ($data ['expression'] <= 33)
							$data ['expression'] = '正常';
						else if ($data ['expression'] <= 66)
							$data ['expression'] = '微笑';
						else
							$data ['expression'] = '大笑';
						$return = array (
								'codes' => 0,
								'similarity' => $max,
								'data' => $data 
						);
					}
					echo json_encode ( $return );
				} else {
					$return = array (
							'codes' => 200,
							'similarity' => 0,
							'data' => '未选择对比图片' 
					);
					echo json_encode ( $return );
				}
			else {
				$return = array (
						'codes' => 202,
						'similarity' => 0,
						'data' => '未选择图片' 
				);
				echo json_encode ( $return );
			}
		}
		break;
	case 'picturetag' :
		{
			if (isset ( $_POST ['urladd'] )) {
				$urladd = $_POST ['urladd'];
				$res = YouTu::imagetagurl ( $urladd );
				if ($res ['errorcode'] == 0) {
					$return = array (
							'codes' => 0,
							'tags' => count ( $res ['tags'] ),
							'data' => $res ['tags'] 
					);
					echo json_encode ( $return );
				} else {
					$return = array (
							'codes' => 404,
							'tags' => 0,
							'data' => $res ['errormsg'] 
					);
					echo json_encode ( $return );
				}
			} else {
				$return = array (
						'codes' => 200,
						'tags' => 0,
						'data' => '未选择图片' 
				);
				echo json_encode ( $return );
			}
		}
		break;
	case 'bonus' :
		{
			if (isset ( $_POST ['urladd'] )) {
				$urladd = $_POST ['urladd'];
				$url_res = YouTu::detectfaceurl ( $urladd, 0 );
				$info = getimagesize ( $urladd );
				if (count ( $url_res ) == 6) {
					$code = $url_res ['errorcode'];
					if ($code == 0) {
						$face_num = count ( $url_res ['face'] );
						$pri = rand ( 0, $face_num - 1 );
						if ($info [2] == 2) {
							$filename = $urladd;
							$im = imagecreatefromjpeg ( $filename );
							$new_img_width = 200;
							$new_img_height = 200;
							$newim = imagecreatetruecolor ( $new_img_width, $new_img_height );
							imagecopyresampled ( $newim, $im, 0, 0, $url_res ['face'] [$pri] ['x'], 
									$url_res ['face'] [$pri] ['y'],$new_img_width, $new_img_height,  
									$url_res ['face'] [$pri] ['width'], 
									$url_res ['face'] [$pri] ['height'] );
							// $file=imagejpeg($newim,' ',100);
							$pic = time () . "$pri" . '.jpg';
							$s = new SaeStorage ();
							ob_start ();
							imagejpeg ( $newim );
							$imgstr = ob_get_contents ();
							$s->write ( 'picture', "$pic", $imgstr );
							ob_end_clean ();
							imagedestroy ( $newim );
							imagedestroy ( $im );
						} else if ($info [2] == 3) {
							$filename = $urladd;
							$im = imagecreatefrompng ( $filename );
							$new_img_width = 200;
							$new_img_height = 200;
							$newim = imagecreatetruecolor ( $new_img_width, $new_img_height );
							imagecopyresampled ( $newim, $im, 0, 0, $url_res ['face'] [$pri] ['x'], 
									$url_res ['face'] [$pri] ['y'], $new_img_width, $new_img_height,
									$url_res ['face'] [$pri] ['width'], 
									$url_res ['face'] [$pri] ['height'] );
							// $file=imagejpeg($newim,' ',100);
							$pic = time () . "$pri" . '.png';
							$s = new SaeStorage ();
							ob_start ();
							imagepng ( $newim );
							$imgstr = ob_get_contents ();
							$s->write ( 'picture', "$pic", $imgstr );
							ob_end_clean ();
							imagedestroy ( $newim );
							imagedestroy ( $im );
						}
						$data = array ();
						$data ['width'] = $url_res ['face'] [$pri] ['width'] / $info [0];
						$data ['height'] = $url_res ['face'] [$pri] ['height'] / $info [1];
						$data ['x'] = $url_res ['face'] [$pri] ['x'] / $info [0];
						$data ['y'] = $url_res ['face'] [$pri] ['y'] / $info [1];
						$data ['url'] = "http://detectpic-picture.stor.sinaapp.com/$pic";
						$return = array (
								'codes' => $code,
								'data' => $data 
						);
						echo json_encode ( $return );
					} else {
						$data = $url_res ['errormsg'];
						$return = array (
								'codes' => $code,
								'data' => $data 
						);
						echo json_encode ( $return );
					}
				} else if (count ( $url_res ) == 4) {
					$code = $url_res ['errorcode'];
					$data = $url_res ['errormsg'];
					$return = array (
							'codes' => $code,
							'data' => $data 
					);
					echo json_encode ( $return );
				}
			} else {
				$return = array (
						'codes' => 200,
						'data' => '未选择图片' 
				);
				echo json_encode ( $return );
			}
		}
		break;
	case 'symmetry' :
		{
			$urladd = $_POST ['urladd'];
			$url_res = YouTu::detectfaceurl ( $urladd, 0 );
			$nose = Youtu::faceshapeurl ( $urladd, 0 );
			$wu_num = count ( $nose ['face_shape'] );
			$info = getimagesize ( $urladd );
			$pname = array ();
			$plname = array ();
			$prname = array ();
			$cc = - 1;
			if (count ( $url_res ) == 6) {
				$code = $url_res ['errorcode'];
				if ($code == 0) {
					$face_num = count ( $url_res ['face'] );
					$data = array ();
					for($j = 0; $j < $face_num; $j ++) {
						if ($info [2] == 2) {
							$filename = $urladd;
							$im = imagecreatefromjpeg ( $filename );
							$new_img_width = $url_res ['face'] [$j] ['width'];
							$new_img_height = $url_res ['face'] [$j] ['height'];
							$newim = imagecreatetruecolor ( $new_img_width, $new_img_height );
							imagecopyresampled ( $newim, $im, 0, 0, $url_res ['face'] [$j] ['x'], 
									$url_res ['face'] [$j] ['y'],$new_img_width, $new_img_height, 
									$url_res ['face'] [$j] ['width'], 
									$url_res ['face'] [$j] ['height'] );
							// $file=imagejpeg($newim,' ',100);
							$xuanding = - 1;
							for($jj = 0; $jj < $wu_num; $jj ++) {
								if ((($url_res ['face'] [$j] ['x'] + $url_res ['face'] [$j] ['width']) > $nose ['face_shape'] [$jj] ['left_eyebrow'] [0] ['x'] && $url_res ['face'] [$j] ['x'] < $nose ['face_shape'] [$jj] ['left_eyebrow'] [0] ['x']) && (($url_res ['face'] [$j] ['y'] + $url_res ['face'] [$j] ['height']) > $nose ['face_shape'] [$jj] ['left_eyebrow'] [0] ['y'] && $url_res ['face'] [$j] ['y'] < $nose ['face_shape'] [$jj] ['left_eyebrow'] [0] ['y'])) {
									$xuanding = $jj;
								}
							}
							if ($xuanding != - 1) {
								$lwid = $nose ['face_shape'] [$xuanding] ['nose'] [0] ['x'] - $url_res ['face'] [$j] ['x'];
								$rwid = $url_res ['face'] [$j] ['width'] - $lwid;
								$pname [$j] = time () . "$j" . '_old.jpg';
								$s = new SaeStorage ();
								ob_start ();
								imagejpeg ( $newim );
								$imgstr = ob_get_contents ();
								$s->write ( 'picture', "$pname[$j]", $imgstr );
								ob_end_clean ();
								$fn = "http://detectpic-picture.stor.sinaapp.com/$pname[$j]";
								$back = imagecreatefromjpeg ( $fn );
								$width = $lwid * 2;
								$height = $new_img_height;
								// 创建一个新的图片资源，用来保存沿Y轴翻转后的图片
								$new = imagecreatetruecolor ( $width, $height );
								// 沿y轴翻转就是将原图从右向左按一个像素宽度向新资源中逐个复制
								for($x = 0; $x < $lwid; $x ++) {
									// 逐条复制图片本身高度，1个像素宽度的图片到薪资源中
									imagecopy ( $new, $back, $width - $x - 1, 0, $x, 0, 1, $height );
								}
								imagecopyresampled ( $new, $back, 0, 0, 0, 0, $width / 2, $height, $width / 2, $height );
								// 保存翻转后的图片
								$plname [$j] = time () . "$j" . '_l.jpg';
								$s = new SaeStorage ();
								ob_start ();
								imagejpeg ( $new );
								$imgstr = ob_get_contents ();
								$s->write ( 'picture', "$plname[$j]", $imgstr );
								ob_end_clean ();
								imagedestroy ( $back );
								imagedestroy ( $new );
								$back = imagecreatefromjpeg ( $fn );
								$width = $rwid * 2;
								$height = $new_img_height;
								// 创建一个新的图片资源，用来保存沿Y轴翻转后的图片
								$new = imagecreatetruecolor ( $width, $height );
								// 沿y轴翻转就是将原图从右向左按一个像素宽度向新资源中逐个复制
								for($x = 0; $x < $rwid; $x ++) {
									// 逐条复制图片本身高度，1个像素宽度的图片到薪资源中
									imagecopy ( $new, $back, $x, 0, imagesx ( $back ) - $x, 0, 1, $height );
								}
								imagecopyresampled ( $new, $back, $rwid, 0, $lwid, 0, $rwid, $height, $rwid, $height );
								// 保存翻转后的图片
								
								$prname [$j] = time () . "$j" . '_r.jpg';
								$s = new SaeStorage ();
								ob_start ();
								imagejpeg ( $new );
								$imgstr = ob_get_contents ();
								$s->write ( 'picture', "$prname[$j]", $imgstr );
								ob_end_clean ();
								imagedestroy ( $back );
								imagedestroy ( $new );
								imagedestroy ( $newim );
								imagedestroy ( $im );
							}
						} else if ($info [2] == 3) {
							$filename = $urladd;
							$im = imagecreatefrompng ( $filename );
							$new_img_width = $url_res ['face'] [$j] ['width'];
							$new_img_height = $url_res ['face'] [$j] ['height'];
							$newim = imagecreatetruecolor ( $new_img_width, $new_img_height );
							imagecopyresampled ( $newim, $im, 0, 0, $url_res ['face'] [$j] ['x'], 
									$url_res ['face'] [$j] ['y'] , $new_img_width, $new_img_height, 
									$url_res ['face'] [$j] ['width'], 
									$url_res ['face'] [$j] ['height']);
							// $file=imagejpeg($newim,' ',100);
							$xuanding = - 1;
							for($jj = 0; $jj < $wu_num; $jj ++) {
								if (($url_res ['face'] [$j] [x] + $url_res ['face'] [$j] ['width']) > $nose ['face_shape'] [$jj] ['left_eyebrow'] [0] [x] && ($url_res ['face'] [$j] [y] + $url_res ['face'] [$j] ['height']) > $nose ['face_shape'] [$jj] ['left_eyebrow'] [0] [y]) {
									$xuanding = $jj;
								}
							}
							if ($xuanding != - 1) {
								$lwid = $nose ['face_shape'] [$xuanding] ['nose'] [0] [x] - $url_res ['face'] [$j] ['x'];
								$rwid = $url_res ['face'] [$j] ['width'] - $lwid;
								$pname [$j] = time () . "$j" . '_old.png';
								$s = new SaeStorage ();
								ob_start ();
								imagepng ( $newim );
								$imgstr = ob_get_contents ();
								$s->write ( 'picture', "$pname[$j]", $imgstr );
								ob_end_clean ();
								$fn = "http://detectpic-picture.stor.sinaapp.com/$pname[$j]";
								$back = imagecreatefrompng ( $fn );
								$width = $lwid * 2;
								$height = $new_img_height;
								// 创建一个新的图片资源，用来保存沿Y轴翻转后的图片
								$new = imagecreatetruecolor ( $width, $height );
								// 沿y轴翻转就是将原图从右向左按一个像素宽度向新资源中逐个复制
								for($x = 0; $x < $lwid; $x ++) {
									// 逐条复制图片本身高度，1个像素宽度的图片到薪资源中
									imagecopy ( $new, $back, $width - $x - 1, 0, $x, 0, 1, $height );
								}
								imagecopyresampled ( $new, $back, 0, 0, 0, 0, $width / 2, $height, $width / 2, $height );
								// 保存翻转后的图片
								$plname [$j] = time () . "$j" . '_l.png';
								$s = new SaeStorage ();
								ob_start ();
								imagepng ( $new );
								$imgstr = ob_get_contents ();
								$s->write ( 'picture', "$plname[$j]", $imgstr );
								ob_end_clean ();
								imagedestroy ( $back );
								imagedestroy ( $new );
								$back = imagecreatefrompng ( $fn );
								$width = $rwid * 2;
								$height = $new_img_height;
								// 创建一个新的图片资源，用来保存沿Y轴翻转后的图片
								$new = imagecreatetruecolor ( $width, $height );
								// 沿y轴翻转就是将原图从右向左按一个像素宽度向新资源中逐个复制
								for($x = 0; $x < $rwid; $x ++) {
									// 逐条复制图片本身高度，1个像素宽度的图片到薪资源中
									imagecopy ( $new, $back, $x, 0, imagesx ( $back ) - $x, 0, 1, $height );
								}
								imagecopyresampled ( $new, $back, $rwid, 0, $lwid, 0, $rwid, $height, $rwid, $height );
								// 保存翻转后的图片
								
								$prname [$j] = time () . "$j" . '_r.png';
								$s = new SaeStorage ();
								ob_start ();
								imagepng ( $new );
								$imgstr = ob_get_contents ();
								$s->write ( 'picture', "$prname[$j]", $imgstr );
								ob_end_clean ();
								imagedestroy ( $back );
								imagedestroy ( $new );
								imagedestroy ( $newim );
								imagedestroy ( $im );
							}
						}
						if ($xuanding != - 1) {
							$cc ++;
							$data [$cc] = array (
									'url_old' => "http://detectpic-picture.stor.sinaapp.com/$pname[$j]",
									'url_l' => "http://detectpic-picture.stor.sinaapp.com/$plname[$j]",
									'url_r' => "http://detectpic-picture.stor.sinaapp.com/$prname[$j]" 
							);
						}
					}
					$return = array (
							'codes' => 0,
							'facenum' => ($cc + 1),
							'data' => $data 
					);
					echo json_encode ( $return );
				}
			} else {
				$return = array (
						'codes' => 404,
						'facenum' => 0,
						'data' => "出错" 
				);
				echo json_encode ( $return );
			}
		}
		break;
	case 'fudiao' :
		{
			$urladd = $_POST ['urladd'];
			$info = getimagesize ( $urladd );
			if ($info [2] == 2) {
				$filename = $urladd;
				$im = imagecreatefromjpeg ( $filename );
				imagefilter ( $im, IMG_FILTER_EMBOSS );
				$picname = time () . '.jpg';
				$s = new SaeStorage ();
				ob_start ();
				imagejpeg ( $im );
				$imgstr = ob_get_contents ();
				$s->write ( 'picture', "$picname", $imgstr );
				ob_end_clean ();
				imagedestroy ( $im );
			} else if ($info [2] == 3) {
				$filename = $urladd;
				$im = imagecreatefrompng ( $filename );
				imagefilter ( $im, IMG_FILTER_EMBOSS );
				$picname = time () . '.png';
				$s = new SaeStorage ();
				ob_start ();
				imagepng ( $im );
				$imgstr = ob_get_contents ();
				$s->write ( 'picture', "$picname", $imgstr );
				ob_end_clean ();
				imagedestroy ( $im );
			}
			$return = array (
					'codes'=>0,
					'url' => "http://detectpic-picture.stor.sinaapp.com/$picname" 
			);
			echo json_encode ( $return );
		}
		break;
}
?>
