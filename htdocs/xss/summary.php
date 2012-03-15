<?php
session_start();
$con = mysql_connect("localhost",'root','');
mysql_select_db('xss',$con);

if(isset($_REQUEST['user']) and $_REQUEST['user']!="")
{
	$user=$_REQUEST['user'];
}
else
{
	$user="%";
}
/*
if(isset($_REQUEST['product']) and $_REQUEST['product']!="")
{
	$product=$_REQUEST['product'];
}
else
{
	$product="%";
}
*/
if(isset($_POST['chk']) and $_POST['chk'])
{
	$ids=implode(",",$_POST['chk']);
	$sql="DELETE FROM `threat` WHERE `nid` in ($ids)";
	mysql_query($sql);
	$cntdel=mysql_affected_rows();
}
?>
<?php
	//$query = "SELECT * FROM threat WHERE user like '$user' AND product like '$product'";
	$query = "SELECT * FROM threat WHERE user like '$user'";
	
	
	if(isset($_POST['limit']))
	{
		$per_page=$_POST['limit']; 	
		$_SESSION['slimit']=$per_page;
	}
	
	if(isset($_SESSION['slimit']))
	{
		$per_page = $_SESSION['slimit']; 	
	}
	else
	{
		$_SESSION['slimit']=$per_page=25;
	}
	
	$rsd=mysql_query($query);
	$count=mysql_num_rows($rsd);
	$pages=ceil($count/$per_page);
	$page=1;
	
	if(isset($_REQUEST['page']))
	{
		$page=$_REQUEST['page'];
	}
	else
	{
		$_REQUEST['page']=1;
	}

	//get table contents
	$start = ($page-1)*$per_page;
	//$query = "SELECT * FROM threat WHERE user like '$user' AND product like '$product' limit $start,$per_page";
	$query = "SELECT * FROM threat WHERE user like '$user' limit $start,$per_page";
?>

<html>
	<head>
		<title> Scan Report </title>
		
		<?php if(isset($_REQUEST['autorefresh_x']) or (isset($_SESSION['sautorefresh_x']) and $_SESSION['sautorefresh_x']>0)):$_SESSION['sautorefresh_x']=1;?>
		<meta http-equiv="refresh" content="5">
		
		<?php endif;?>
		<?php if(isset($_REQUEST['notrefresh_x'])): unset($_SESSION['sautorefresh_x']);?>
		<?php endif;?>
		
		<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/tabview/assets/skins/sam/tabview.css" />
		<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/datatable/assets/skins/sam/datatable.css" />
		<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/button/assets/skins/sam/button.css" />
		
		<script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/yuiloader/yuiloader-min.js"></script>
		<script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/dom/dom-min.js"></script>
		<script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/event/event-min.js"></script>
		<script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/element/element-min.js"></script>
		<script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/tabview/tabview-min.js"></script>
		<script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/datasource/datasource-min.js"></script>
		<script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/event-delegate/event-delegate-min.js"></script>
		<script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/datatable/datatable-min.js"></script>
		<script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/button/button-min.js"></script>
		
		<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/fonts/fonts-min.css"/>
		<link rel="stylesheet" type="text/css" href="http://yui.yahooapis.com/2.9.0/build/container/assets/skins/sam/container.css" />
		
		<script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/yahoo-dom-event/yahoo-dom-event.js"></script>
		<script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/dragdrop/dragdrop-min.js"></script>
		<script type="text/javascript" src="http://yui.yahooapis.com/2.9.0/build/container/container-min.js"></script>
		
		<style>
		@font-face {
		font-family: 'DesignationRegular';
		src: url('designation-webfont.eot');
		src: local('?'), url('designation-webfont.woff') format('woff'), url('designation-webfont.ttf') format('truetype'), url('designation-webfont.svg#webfont2gQKTcGt') format('svg');
		font-weight: normal;
		font-style: normal;
		}
		
		.explain_title
		{
			color: #882288;
			font: bolder italic 13pt Arial, sans-serif;
			margin-bottom: 4px;
		}
		</style>

		<script>
			function setCheckboxes(act)
			{
				var e = document.getElementsByClassName('chkbox');
				var elts_cnt  = (typeof(e.length) != 'undefined') ? e.length : 0;
				
				if (!elts_cnt)
				{
					return;
				}
  
				for (var i = 0; i < elts_cnt; i++)
				{
					e[i].checked = (act == 1 || act == 0) ? act : (e[i].checked ? 0 : 1);
				}
			}

			function highlight(id1)
			{
				document.getElementById(id1).style.backgroundColor="purple";
				document.getElementById(id1).style.color="white";
			}

			function unhighlight(id1)
			{
				document.getElementById(id1).style.color="#555555";
				
				if(id1 % 2)
				{
					document.getElementById(id1).style.backgroundColor="#EDF5FF";
				}
				else
				{
					document.getElementById(id1).style.backgroundColor="white";
				}
			}
		</script>
	</head>
	
	<body id="summaryreport" class="yui-skin-sam">
		<center>
			<table>
				<tr style="">
					<td style="float:left;width:100;height:50;"><img src="img/logo.png" style="height:100%;width:100%;margin-right:10px;"></td>
				
					<td style="float:left;vertical-align:middle; color:#555555; font-size:30px; font-family:'DesignationRegular'; font-weight: 400; letter-spacing: -1px; text-shadow: 1px 1px 4px #BBBBBB;}"> - DOM XSS Scanner</td>
				</tr>
			</table>
		</center>
	
		<div class="yui-content"><div id="addoncontainer"></div></div>
		
		<script>
			YAHOO.namespace("example.container");

			function init() 
			{
				// Instantiate a Panel from markup
				
				<?php  $result = mysql_query($query);while($row = mysql_fetch_array($result)){?>
				document.getElementById('panel<?php echo "{$row['nid']}"?>').style.display='block';
				YAHOO.example.container.panel<?php echo "{$row['nid']}"?> = new YAHOO.widget.Panel("panel<?php echo "{$row['nid']}"?>", { width:"320px", visible:false, constraintoviewport:true});
				YAHOO.example.container.panel<?php echo "{$row['nid']}"?>.render();			
				YAHOO.util.Event.addListener("show<?php echo "{$row['nid']}"?>", "click", YAHOO.example.container.panel<?php echo "{$row['nid']}"?>.show, YAHOO.example.container.panel<?php echo "{$row['nid']}"?>, true);
				<?php } ?>
		
			}

			YAHOO.util.Event.addListener(window, "load", init);
		</script>

		<div id="container">
			<center>
			<form method="post" name="myform" id="myform">
			<table class="yui-dt" cellpadding="10px" border=1  style="color:#555555; font-size:15px; font-family: 'DesignationRegular'; font-weight: 400; text-shadow: 1px 1px 4px #BBBBBB;">
			<thead>
				<tr style="height:35px;font-weight:bold;">
					<th colspan=5 style="font-size:25px;font-weight:bold;">
						<div>
							<div style="float:left;text-shadow: 1px 1px 4px #BBBBBB;">SCAN REPORT</div>
							<div style="float:right;font-size:15px;font-weight:normal;text-align:left">Logged User: nishantp<?php //echo ucfirst($user);?><br>Date: <?php echo date("m/d/Y");?>
					
								<?php if(isset($_SESSION['sautorefresh_x'])):?>
								<input type="image" title="Stop Auto Refresh" style="width:25px;height:25px;vertical-align:middle" src="http://icons.iconarchive.com/icons/mattahan/umicons/128/Refresh-icon.png" alt="noimage" name="notrefresh">
								<?php else:?>
								<input type="image"  title="Start Auto Refresh"  style="width:25px;height:25px;vertical-align:middle" src="http://aux.iconpedia.net/uploads/1468677756.png" alt="noimage" name="autorefresh">
								<?php endif;?>
							</div>
						</div>
					</th>
				</tr>
			</thead>
			
			<thead>
				<tr style="height:35px;font-weight:bold;">
					<th>&nbsp;</th>
						<th style="vertical-align: middle;font-weight:bold;">S.No. </th>
						<th style="vertical-align: middle;font-weight:bold;">Date </th>
						<th style="vertical-align: middle;font-weight:bold;">URL </th>
						<th style="vertical-align: middle;font-weight:bold;">Threat </th>
				</tr>
			</thead>
			<?php
				$result = mysql_query($query);
				$cnt=0;
				while($row = mysql_fetch_array($result))
				{
					$row['url']=str_replace("scanPage()", "alert(1)", $row['url']);
			?>

			<tr id="<?php echo $cnt+1; ?>" style="height:30px;background-color:<?php echo ($cnt%2==0)?'#EDF5FF':'white';?>" onmouseover="highlight(this.id)"   onmouseout="unhighlight(this.id)">
			<td><input type="checkbox" name="chk[]" class="chkbox" value="<?php echo "{$row['nid']}"?>"></td>
			<td align="center" style="padding:12px;">
				<?php echo $cnt+1; ?>
			</td>
			<td  style="padding:12px;">
				<?php echo $row['date']?>
			</td>
			<td>
				<a id="<?php echo "show{$row['nid']}"?>" style="cursor:pointer;"><?php echo htmlspecialchars($row['url'],ENT_QUOTES) ?></a> 
				<div id="<?php echo "panel{$row['nid']}"?>" style="color:black;display:none">
				<div class="hd">Description </div>
				<div class="bd">
					<div class="explain_title">User Data in Javascript Block</div>
					<?php echo "{$row['comment']}"?><br><br>
					<div class="explain_title">Fix</div>
					<?php if(!trim($row['fix'])):$row['fix']="N/A";endif;?>
					<?php echo "{$row['fix']}"?>
					<br><br><a href="<?php echo $row['url'];?>" target="_blank">Manually Verify</a>
				</div>
	
	
				</div>
			</div>
			</td>
			<td  style="padding:12px;"><?php if(!trim($row['eventThreat'])):$row['eventThreat']="N/A";endif;echo htmlspecialchars($row['eventThreat'],ENT_QUOTES) ?></td>
			</tr>
<?php
$cnt++;
}


?>
<tr><td colspan=5><table border="0" width="100%" style="background-color:#eeeeee;border-width:0;border-style:none">
<tr>

<td style="height:30px;background-color:'#EDF5FF'">

<a onClick="setCheckboxes(1)" style="cursor:pointer;font-size:12px;font-family:DesignationRegular">Check All</a>&nbsp;
<a onClick="setCheckboxes(0)" style="cursor:pointer;font-size:12px;font-family:DesignationRegular">Uncheck All</a>&nbsp;
<font color="#000000" style="font-size:13px;font-family:DesignationRegular">Delete selected:</font>
&nbsp;&nbsp;<a name="del" style="cursor:pointer;" id="del" onclick="if(confirm('Are you sure you want to delete selected item(s)?')){document.forms[0].submit(); return true} else{ return false;}"><img src="http://www.downloadatoz.com/_imgbank/0910/PowerDel.icon.gif" width=16px height=16px alt="delete" title="Delete" style="vertical-align:middle;"/></a>
</td>
<td style="height:30px;background-color:'#EDF5FF';text-align:right" nowrap>

<table border="0" width="100%" style="border-width:0;border-style:none">
<tr>
<td style="text-align:left;border-width:0;border-style:none">
	<?php if($pages>1 and $_REQUEST['page']>1):?>
				<a href='summary.php?page=1' ><img src="http://icons.iconarchive.com/icons/fatcow/farm-fresh/32/resultset-last-icon.png" width=16px height=16px alt="First" title="First"/></a>&nbsp;
				<a href='summary.php?page=<?php echo $_REQUEST['page']-1;?>' ><img src="http://cdn2.iconfinder.com/data/icons/glaze/64x64/actions/next.png" width=16px height=16px alt="Prev" title="Prev"/></a>&nbsp;
				<?php endif;?>
				 &nbsp;&nbsp;&nbsp;
				<?php if($pages>1 and $_REQUEST['page']< $pages):?>
				<a href='summary.php?page=<?php echo $_REQUEST['page']+1;?>' > <img src="http://cdn2.iconfinder.com/data/icons/glaze/64x64/actions/next.png" width=16px height=16px alt="Next" title="Next"/></a>&nbsp;
				<a href='summary.php?page=<?php echo $pages;?>' ><img src="http://icons.iconarchive.com/icons/fatcow/farm-fresh/32/resultset-last-icon.png" width=16px height=16px alt="Last" title="Last"/></a>&nbsp;
				<?php endif;?>
			</td>
	<td style="text-align:right;border-width:0;border-style:none">
	
				<select name="limit" id="limit"  style="width:50px;background-color:#eeeeee" onchange="document.forms[0].submit();">
				<?php for($i=25;$i<=100;$i+=25):?>
				<?php if($i==$_SESSION['slimit']):?>
				<option value="<?php echo $i;?>" selected ><?php echo $i;?></option>
				<?php else:?>
				<option value="<?php echo $i;?>"  ><?php echo $i;?></option>
				<?php endif;?>
				<?php endfor;?>
				</select>
				<font color="#000000" style="font-size:12px;font-family:DesignationRegular">records per page</font>
			
</td>

</tr>
</table></td></tr>
</table></td></tr>
</table></form>
</center>
</div>
</body>
</html>
