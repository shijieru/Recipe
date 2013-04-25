<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<jsp:include page="template-top.jsp" />
<input type="hidden" name="hid_gourl" value="/u/u62182782331893.html" />
<div id="userplace" class="clearfix">
	<div class="userinfo">
		<div class="ushead">
			<a class="user" href="http://www.douguo.com/u/u62182782331893.html"><img
				src="http://tx1.douguo.net/upload/photo/c/0/6/u6218278233189303072220.jpg"></a>
		</div>
		<div class="uscome">
			<div class="mb20 clearfix">
				<h1 class="mb3">
					${thisUser.userName}<a href='/user/prodesc' class='picon progr'
						rel='nofollow' target='_blank'></a>
				</h1>
				<div class="clearfix">
					<span class="fcc">Region</span>
				</div>

			</div>
			<p id="uchome_desc_full" class="pingro mb25">
				self-introduction<span></span>
			</p>

		</div>
		<a class="baddf gzrim careadd2 trgz dblok"
			href="follow.do?userName=${thisUser.userName}">+follow</a>
		<div class="numifo r3">
			<ul>
				<li class="lirdr"><a href="/u/u62182782331893/friends"
					rel="nofollow">2 </a><br />Follow</li>
				<li class="lirdr"><a href="/u/u62182782331893/fans"
					rel="nofollow">105</a><br />Fans</li>
				<li class="lirdr"><a href="/u/u62182782331893/recipe"
					rel="nofollow">13</a><br />Recipes</li>
				<li><a href="/u/u62182782331893/diet" rel="nofollow">5</a><br />Diaries</li>
			</ul>
		</div>
	</div>
</div>
<div id="main" class="clearfix pt50">
	<div class="maleft">
		<div class="usrecie clearfix mb25">
			<h2 class="pb13">
				Recipes<span>(number)</span>
			</h2>
			<div class="reone r3 mrxl">
				<a href="http://www.douguo.com/cookbook/214564.html" target="_blank"><img
					src="http://cp1.douguo.net/upload/caiku/3/8/5/200_386ec6fa54c7f1d22ab56a9c6a378f95.jpg"></a>
				<h3>
					<a href="http://www.douguo.com/cookbook/214564.html"
						target="_blank">recipe title</a>
				</h3>
				<span>19collected 3reviews</span>
			</div>
			<div class="reone r3 mrxl">
				<a href="http://www.douguo.com/cookbook/214564.html" target="_blank"><img
					src="http://cp1.douguo.net/upload/caiku/3/8/5/200_386ec6fa54c7f1d22ab56a9c6a378f95.jpg"></a>
				<h3>
					<a href="http://www.douguo.com/cookbook/214564.html"
						target="_blank">recipe title</a>
				</h3>
				<span>19collected 3reviews</span>
			</div>
			<div class="reone r3 ">
				<a href="http://www.douguo.com/cookbook/214564.html" target="_blank"><img
					src="http://cp1.douguo.net/upload/caiku/3/8/5/200_386ec6fa54c7f1d22ab56a9c6a378f95.jpg"></a>
				<h3>
					<a href="http://www.douguo.com/cookbook/214564.html"
						target="_blank">recipe title</a>
				</h3>
				<span>19collected 3reviews</span>
			</div>
		</div>

		<div class="usdiet clearfix">
			<h2 class="pb13">
				Diary<span class="smor">(number)</span>
			</h2>
			<div class="dione r3 mrxl">
				<a href="http://www.douguo.com/diet/detail/696473"><img
					src="http://rj1.douguo.net/upload/caiku/1/6/8/125_16ebf9af106550132a391ccdef5878e8.jpg"></a>
				<h3>
					<a href="http://www.douguo.com/diet/detail/696473" target="_blank">diary
						title</a>
				</h3>
				<span>place</span>
			</div>
		</div>
	</div>
	<div class="maright">
		<div class="careper mb35 clearfix">
			<h2 class="pb13">
				Followed people: <span>${ fn:length(idolList) }</span>
			</h2>
			<c:forEach var="idol" items="${idolList}">
				<a href="viewUser.do?name=${ idol.idolName }">${ idol.idolName }</a>
			</c:forEach>

		</div>
		<div class="careper mb35 clearfix">
			<h2 class="pb13">
				Fans: <span>${ fn:length(followerList) }</span>
			</h2>
			<c:forEach var="follower" items="${followerList}">
				<a href="viewUser.do?name=${ follower.userName }">${
					follower.userName }</a>
			</c:forEach>
		</div>
	</div>
</div>
<jsp:include page="template-bottom.jsp" />