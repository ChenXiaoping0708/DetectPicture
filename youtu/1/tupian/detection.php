<?php
require ('./include.php');
use TencentYoutuyun\Youtu;
use TencentYoutuyun\Conf;
use TencentYoutuyun\Auth;
require ('./sample.php');

/*
 * POST传入 $_POST['request']
 */
/*if (! empty ( $_POST ['request'] ))
	$request = $_POST ['request'];
else
	$request = 0;
switch ($request) {
	case 'local' :
		if (isset ( $_POST ['localadd'] )) {
			if (isset ( $_POST ['isbigface'] )) {
				$isbig = $_POST ['isbigface']; // isbigface 0正常 1大脸模式
				$localadd = $_POST ['localadd'];
				$dectect_res = YouTu::detectface ( $localadd, $isbig );
				if (count ( $dectect_res ) == 6) {
					$code = $dectect_res ['errorcode'];
					if ($code == 0) {
						$face_num = count ( $dectect_res ['face'] );
						$data = $dectect_res ['face'];
						for($i = 0; $i < $face_num; $i ++) {
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
								'code' => $code,
								'facenum' => $face_num,
								'data' => $data 
						);
						echo json_encode ( $return );
					} else {
						$face_num = 0;
						$data = $dectect_res ['errormsg'];
						$return = array (
								'code' => $code,
								'facenum' => $face_num,
								'data' => $data 
						);
						echo json_encode ( $return );
					}
				} else {
					$code = $dectect_res ['code'];
					$face_num = 0;
					$data = $dectect_res ['message'];
					$return = array (
							'code' => $code,
							'facenum' => $face_num,
							'data' => $data 
					);
					echo json_encode ( $return );
				}
			} else {
				$return = array (
						'code' => 202,
						'facenum' => 0,
						'data' => "未选择是否大脸模式" 
				);
			}
		} else {
			$return = array (
					'code' => 200,
					'facenum' => 0,
					'data' => "未选择图片" 
			);
		}
	case 'url' :*/
		//if (isset ( $_POST ['urladd'] )) 
		{
			//if (isset ( $_POST ['isbigface'] )) 
			{
				$isbig = $_POST ['isbigface']; // isbigface 0正常 1大脸模式
				$urladd = $_POST ['urladd'];
				echo $_POST ['isbigface'];
				echo $_POST ['isbigface'];
				//echo $isbig."sdgdsg".$urladd;
				if($isbig==1)
				$url_res = YouTu::detectfaceurl ($urladd, 1);
				else $url_res = YouTu::detectfaceurl ($urladd, 0);
				var_dump( $url_res);
				if (count ( $url_res ) == 6) {
					$code = $url_res ['errorcode'];
					if ($code == 0) {
						$face_num = count ( $url_res ['face'] );
						$data = $url_res ['face'];
						for($i = 0; $i < $face_num; $i ++) {
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
								'facenum' => $face_num
						);
						echo $return['codes']." ".$return['facenum'];
					} else {
						$face_num = 0;
						$data = $url_res ['errormsg'];
						$return = array (
								'codes' => $code,
								'facenum' => $face_num
						);
						echo $return['codes']." ".$return['facenum'];
					}
				} else if (count ( $url_res ) == 4) {
					$code = $url_res ['errorcode'];
					$face_num = 0;
					$data = $url_res ['errormsg'];
					$return = array (
							'codes' => $code,
							'facenum' => $face_num
					);
					echo $return['codes']." ".$return['facenum'];
				}
			} /*else {
				$return = array (
						'codes' => 202,
						'facenum' => 0
				);
				echo $return['codes']." ".$return['facenum'];
			}
		} else {
			$return = array (
					'codes' => 200,
					'facenum' => 0
			);
			echo $return['codes']." ".$return['facenum'];
		}*/
		}
?>
