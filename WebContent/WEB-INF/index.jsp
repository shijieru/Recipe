<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<jsp:include page="template-top.jsp" />

<div id="main" class="clearfix">
	<div class="maleft">
		<div class="nmenu mb18">
			<h2>
				Popular Recipe <span class="smor"><a href="#">(More)</a></span>
			</h2>
			<div class="effect" style="width: 650px">
				<div class="leftLoop">
					<div class="hd">
						<a class="next"></a>
						<ul>
							<li>1</li>
							<li>2</li>
							<li>3</li>
						</ul>
						<a class="prev"></a>
					</div>
					<div class="bd">
						<ul class="picList">
							<li>
								<div class="scrollcaidanli board r3 mrxl">
									<h3>
										<a href="#">Menu name</a>
									</h3>
									<span> by <a href="#" rel="nofollow">Username</a></span> <a
										href="#" class=""> <img
										src="http://cp1.douguo.net/upload/caiku/9/9/e/200_99a1b23f29c8d83ebee7206aed01940e.jpeg">
									</a>
								</div>
							</li>
							<li>
								<div class="scrollcaidanli board r3 mrxl">
									<h3>
										<a href="#">Menu name</a>
									</h3>
									<span> by <a href="#" rel="nofollow">Username</a></span> <a
										href="#" class=""> <img
										src="http://cp1.douguo.net/upload/caiku/9/9/e/200_99a1b23f29c8d83ebee7206aed01940e.jpeg">
									</a>
								</div>
							</li>
							<li>
								<div class="scrollcaidanli board r3 mrxl">
									<h3>
										<a href="#">Menu name</a>
									</h3>
									<span> by <a href="#" rel="nofollow">Username</a></span> <a
										href="#" class=""> <img
										src="http://cp1.douguo.net/upload/caiku/9/9/e/200_99a1b23f29c8d83ebee7206aed01940e.jpeg">
									</a>
								</div>
							</li>
							<li>
								<div class="scrollcaidanli board r3 mrxl">
									<h3>
										<a href="#">Menu name</a>
									</h3>
									<span> by <a href="#" rel="nofollow">Username</a></span> <a
										href="#" class=""> <img
										src="http://cp1.douguo.net/upload/caiku/9/9/e/200_99a1b23f29c8d83ebee7206aed01940e.jpeg">
									</a>
								</div>
							</li>
							<li>
								<div class="scrollcaidanli board r3 mrxl">
									<h3>
										<a href="#">Menu name</a>
									</h3>
									<span> by <a href="#" rel="nofollow">Username</a></span> <a
										href="#" class=""> <img
										src="http://cp1.douguo.net/upload/caiku/9/9/e/200_99a1b23f29c8d83ebee7206aed01940e.jpeg">
									</a>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="fopro clearfix mb27">
			<h2>
				Avid user <span class="smor"><a href="#">(More)</a></span>
			</h2>
			<div class="meisj r3 clearfix">
				<div class="prone lizjr">
					<div class="mhlio">
						<div class="phder">
							<a href="#" rel="nofollow"><img
								src="http://tx1.douguo.net/upload/photo/2/f/e/70_u5031915897897403190115.jpg"></a>
						</div>
						<h4>
							<a href="viewUser.do?userName=a1">a1</a> 261follow
						</h4>
						<p>description</p>
						<h3>Recent recipe</h3>
						<ul>
							<li><a href="#">recipe name</a></li>
							<li><a href="#">recipe name</a></li>
						</ul>
					</div>
				</div>
				<div class="prthree">
					<div id="viplist">
						<div class="bimo clearfix mb25">
							<div class="pper">
								<a href="#" rel="nofollow"><img
									src="http://tx1.douguo.net/upload/photo/2/f/e/70_u5031915897897403190115.jpg"></a>
							</div>
							<h4>
								<a href="viewUser.do?userName=a1">a1</a> 261follow
							</h4>
						</div>
						<div class="bimo clearfix mb25">
							<div class="pper">
								<a href="#" rel="nofollow"><img
									src="http://tx1.douguo.net/upload/photo/2/f/e/70_u5031915897897403190115.jpg"></a>
							</div>
							<h4>
								<a href="viewUser.do?userName=a2">a2</a> 126follow
							</h4>
							<span>Good at</span>
						</div>
						<div class="bimo clearfix mb25">
							<div class="pper">
								<a href="#" rel="nofollow"><img
									src="http://tx1.douguo.net/upload/photo/2/f/e/70_u5031915897897403190115.jpg"></a>
							</div>
							<h4>
								<a href="viewUser.do?userName=a3">a3</a> 236follow
							</h4>
							<span>Good at</span>
						</div>
					</div>
					<div class="omcheng">
						<span><a href="javascript:void(0)" times='1'
							onclick="ShowMorePros(this,'2073609')" class="ic_change">Shuffle</a></span>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="maright">
		<c:choose>
			<c:when test="${ (empty user) }">
				<div class="newlog r3 mt15 mb20">
					<div class="ichih mb25">Foodie all here, Hurry join in!</div>
					<a href="register.do" rel="nofollow" class="btnrmsjr ml80 r3">Join
						In</a> <span class="otmbd">Already have an account&nbsp;&nbsp;<a
						href="login.do" rel="nofollow">Login Here</a></span>
					<div class="tplat3 ptm pbm mtm clearfix">
						<a href="#" class="btnsmqq ml60 ">Facebook Login</a>
					</div>
				</div>
			</c:when>
			<c:otherwise>
				<div class="loged r3 mb26 mt15 clearfix">
					<div class="omy">
						<div class="wrihd">
							<a href="#"><img
								src="http://tx1.douguo.net/upload/photo/5/3/1/70_u54992337563194024539.jpg"></a>
						</div>
						<div class="clearfix left">
							<h4>
								<a href="viewUser.do?userName=${user.userName}">${user.userName}
							</h4>
							<span> </span>
						</div>
					</div>
					<ul>
						<li><a href="#"># of</a><br>Follower</li>
						<li class="lilbo"><a href="#"># of</a><br>Recipe</li>
						<li class="lilbo"><a href="#"># of</a><br>Diary</li>
					</ul>
					<div class="mtl mb10">
						<span><a href="transferRecipe.do" rel="nofollow"
							class="btncjcp r3 mrm" text-align="center">New Recipe</a></span>
					</div>
			</c:otherwise>
		</c:choose>
	</div>
</div>
</div>

<script src="js/index.js"></script>
<jsp:include page="template-bottom.jsp" />