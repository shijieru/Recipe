<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<title>Happy Cooking</title>
<link href="css/main.css" rel="stylesheet" type="text/css"
	media="screen">
<script src="js/jquery.js"></script>
<script src="js/functions.js"></script>
<script src="js/jquery.autocomplete-min.js"></script>

</head>

<body>

	<div id="header">
		<div class="head">
			<div class="hnav fsl">
				<ul>
					<li><a href="index.do"><span>Home</span></a></li>
					<li><a href="#"><span>Recipe</span></a></li>
				</ul>
			</div>
			<div class="search">
				<form method="POST" id="searchForm" action="#"
					onsubmit="return Search();">
					<input type="text" id="global_search_inpt" class="sput"
						name="keywords" value="search recipe, menu, user"
						onfocus="if(this.value=='search recipe, menu, user') {this.value=''; $(this).addClass('fcbm'); }"
						onblur="if(!this.value) {this.value='search recipe, menu, user';$(this).removeClass('fcbm');}"
						onkeyup="searchonchage()"> <input type="submit"
						value="Search" class="lib">
					<div class="sugg r3" id="mysu" style="display: none;"></div>
				</form>
			</div>
			<div class="tlogin" id="header_info">
				<c:choose>
					<c:when test="${ (empty user) }">
						<span class="slan"><a href="login.do" rel="nofollow">Login</a>&nbsp;&nbsp;&nbsp;<a
							href="register.do" rel="nofollow">Register</a></span>
					</c:when>
					<c:otherwise>
						<span class="slan"><a href="logout.do" rel="nofollow">Logout</a>
					</c:otherwise>
				</c:choose>


			</div>
		</div>
	</div>
	<script type="text/javascript">
		$
				.getJSON(
						'/ajax/getHeaderInfo',
						function(result) {
							var gourl = '';
							if (result['data']['uinfo'].username == '') {
								headerHtml = '<span class="slan"><a href="/signin.html?go='
										+ gourl
										+ '" title="login" rel="nofollow" target="_blank">login</a>&nbsp;&nbsp;&nbsp;<a href="/signup.html" target="_blank" rel="nofollow" title="register">register</a></span>';
							} else {
								headerHtml = '<div class="myifo" onmouseover="overshow()" onmouseout="outshow()">';
								headerHtml += '<a href="/u/'+result['data']['uinfo'].username+'.html" target="_blank" class="plt5"><img id="imgicon" src="'+result['data']['uinfo'].headicon+'" data-src="'+result['data']['uinfo'].headicon+'" alt="'+result['data']['uinfo'].nickname+'">'
										+ result['data']['uinfo'].nickname
										+ '</a>';
								headerHtml += '<div class="swfom r3 hidden" id="header_usermenu">';
								headerHtml += '<span class="arwwj"> </span>';
								headerHtml += '<p>';
								headerHtml += result['data']['uinfo'].notices;
								headerHtml += result['data']['uinfo'].msgs;
								headerHtml += '<a href="#">Find friends</a>';
								headerHtml += '<a href="#" target="_blank">Setting</a>';
								headerHtml += '<a href="#" class="rb3" >Logout</a>';
								headerHtml += '</p>';
								headerHtml += '</div>';
								headerHtml += result['data']['uinfo'].total;
								headerHtml += '</div>';
							}
							$("#header_info").html(headerHtml);
						});
		function overshow() {
			$("#header_usermenu").show()
		}
		function outshow() {
			$("#header_usermenu").hide()
		}
	</script>