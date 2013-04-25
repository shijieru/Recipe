<jsp:include page="template-top.jsp" />
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<div id="main" class="clearfix">
	<div class="releft">
		<div class="recinfo">
			<h1 id="page_cm_id" ctype="caipu">${recipe.title}</h1>
			<div class="bmayi mbm">
				<a class="cboxElement" rel="recipe_img"
					href="recipeImage.do?recipeId=${recipe.rid}"><div class="bipic"
						style="background-image: url(
						recipeImage.do?recipeId=${recipe.rid});background-size: 100%, 100%;"></div></a>
				<img src="recipeImage.do?recipeId=${recipe.rid}" itemprop="image">
			</div>
			<div class="falisc mbm">
				<span class="right fcc">${recipe.listingDate}</span> <span
					class="fwb"><font id="collectsnum">6914</font></span> Collected</a>
			</div>
			<div class="mb20 clearfix">
				<span class="left pts mrm">Share to</span> <a
					href="javascript:void((function(){var title=encodeURIComponent('>>>');var link='http://www.douguo.com/cookbook/200515.html';var pic='http://i1.douguo.net/upload/caiku/f/6/a/f6e3ad4ecd3e850b5207b4c1b7fc379a.jpg';window.open('http://service.t.sina.com.cn/share/share.php?appkey=1065121832&title='+title+'&pic='+pic+'&url='+link+'&ralateUid=1647910344');})())"
					class="newfx_sina">facebook</a> <input type="hidden"
					id="shoucangValue" name="shouCangValue" value="1"> <span
					class="right shoucanginfoaction relative"> <a
					id="shoucangInfo" href="javascript:void(0);" data-id=200515
					class="btnsc  r3">Collect</a>
					<div class="xqmmgil" id="shoucang200515">
						<div class="mm2"></div>
						<div class="cqxsc r3 hidden" id="shoucangbiaoqian">
							<ul>
								<li><a href="javascript:void(0)" id="exitshoucang">Uncollect</a></li>
								<li><a href="javascript:void(0)" id="updatetaginfo">Modify
										tags</a></li>
							</ul>
						</div>
					</div>
				</span>
			</div>
			<div class="mortips mb20" id="displaytag">
				<h4>Tags:</h4>
				<c:forEach var="tag" items="${tags}">
					<span><a href="#">${ tag.tagName}</a></span>
				</c:forEach>
			</div>
			<div class="retew r3 pb25 mb20">
				<div class="xtip " id="miniStory">
					${recipe.ministory} <a href="javascript:void(0);"
						onclick="$('#miniStory').hide();$('#fullStory').show();"
						class="fss">(Unfold)</a>
				</div>
				<div class="xtip hidden" id="fullStory">
					${recipe.fullstory} <a href="javascript:void(0);"
						onclick="$('#fullStory').hide();$('#miniStory').show();"
						class="fss">(fold)</a>
				</div>
				<table width="598" border="0" cellspacing="0" cellpadding="0"
					class="retamr">
					<tr class="mtim">
						<td class="lirre" width="50%"><span class="fwb">Difficulty:</span>
							<c:if test="${recipe.difficulty == 1}">
								Beginner
							</c:if> <c:if test="${recipe.difficulty == 2}">
								Intermediate
							</c:if> <c:if test="${recipe.difficulty == 2}">
								Expert
							</c:if></td>
						<td><span class="fwb">Cooking Time:</span> <c:if
								test="${recipe.cookTime == 10}">
								10min
							</c:if> <c:if test="${recipe.cookTime == 30}">
								10-30min
							</c:if> <c:if test="${recipe.cookTime == 60}">
								30-60min
							</c:if> <c:if test="${recipe.cookTime == 70}">
								more than 1h
							</c:if></td>
					</tr>
					<tr class="mtim">
						<td width="50%"><h2 class="zfliao">Main ingredients</h2></td>
						<td class="relative"></td>
					</tr>
					<c:set var="cnt" value="${0}" />
					<c:forEach var="main" items="${ mainIng}">
						<c:choose>
							<c:when test="${cnt%2 == 0 }">
								<tr>
									<td class="lirre"><span><a target="_blank"
											title="recipes about meat" href="#">${main.ingredientName}</a></span><span
										class='right'>${main.ingredientAmount}</span></td>
							</c:when>
							<c:otherwise>
								<td class="lirre"><span><a target="_blank"
										title="recipes about meat" href="#">${main.ingredientName}</a></span><span
									class='right'>${main.ingredientAmount}</span></td>
								</tr>
							</c:otherwise>
						</c:choose>
						<c:set var="cnt" value="${cnt +1}" />
					</c:forEach>
					<c:if test="${cnt%2 == 1 }">
						<td></td>
						</tr>
					</c:if>

					<tr class="mtim">
						<td width="50%"><h2 class="zfliao">Auxiliary ingredients</h2></td>
						<td>&nbsp;</td>
					</tr>
					<c:set var="cnt" value="${0}" />
					<c:forEach var="aux" items="${  auxIng}">
						<c:choose>
							<c:when test="${cnt%2 == 0 }">
								<tr>
									<td class="lirre"><span><a target="_blank"
											title="recipes about meat" href="#">${aux.ingredientName}</a></span><span
										class='right'>${aux.ingredientAmount}</span></td>
							</c:when>
							<c:otherwise>
								<td class="lirre"><span><a target="_blank"
										title="recipes about meat" href="#">${aux.ingredientName}</a></span><span
									class='right'>${aux.ingredientAmount}</span></td>
								</tr>
							</c:otherwise>
						</c:choose>

						<c:set var="cnt" value="${cnt + 1}" />
					</c:forEach>

					<c:if test="${cnt%2 == 1 }">
						<td></td>
						</tr>
					</c:if>
				</table>
				<div class="step clearfix">
					<h2>Steps</h2>
					<c:set var="cnt" value="${1}" />
					<c:forEach var="step" items="${ steps}">
						<div class="stepcont mll libdm pvl clearfix">
							<div class="pldc">
								<a class="cboxElement" rel="recipe_img"
									href="stepImage.do?stepId=${step.stepId}"><img
									src="stepImage.do?stepId=${step.stepId}" width="100%"
									height="100%" /></a>
							</div>
							<p>
								<span class="fwb">${cnt}</span> ${ step.stepDescription}
							</p>
						</div>
						<c:set var="cnt" value="${cnt + 1}" />
					</c:forEach>
				</div>

				<div class="xtieshi">
					<h2>Tips</h2>
					<p>${ recipe.tips}</p>
				</div>
				<div class="author pts fcc">
					Written by <a href="#" rel="nofollow" target="_blank">${
						author.userName}</a>
				</div>
				<div class="ptl clearfix mll"></div>

			</div>
			<h3 class="mb15 fwb">
				Similar Recipe <a href="/cookbook/200515/alldish" class="fss fwn">(More)</a>
			</h3>
			<div class="onzuopin mt15 mb15">
				<div class="otboxm">
					<ul class="clearfix">
						<li><a href="/dish/1602" target="_blank"
							style="background: url('http://zp1.douguo.net/upload/dish/d/b/a/200_db437e21f3746d835628c5d9de9382ea.jpg') no-repeat 0 center"
							class="wh186140"></a> <span class="dblok fcc mts">by <a
								href="http://www.douguo.com/u/u55270543151211.html">username</a></span><span
							class="dblok fcc pts">2likes</span></li>
						<li><a href="/dish/1567" target="_blank"
							style="background: url('http://zp1.douguo.net/upload/dish/9/c/8/200_9cbbbc42f3a14e3d04b0b93057f3f118.jpg') no-repeat 0 center"
							class="wh186140"></a> <span class="dblok fcc mts">by <a
								href="http://www.douguo.com/u/u31358112.html">username</a></span><span
							class="dblok fcc pts">5likes</span></li>
						<li><a href="/dish/1561" target="_blank"
							style="background: url('http://zp1.douguo.net/upload/dish/b/3/7/200_b30bbab3d03372b017144a31ef2cb277.jpg') no-repeat 0 center"
							class="wh186140"></a> <span class="dblok fcc mts">by <a
								href="http://www.douguo.com/u/u62887336871767.html">username</a></span><span
							class="dblok fcc pts">4likes</span></li>
					</ul>
				</div>
			</div>
			<div class="commww mb65" id="comment_container">
				<a name="comment" id="comment"></a>
				<div class="commentlist" data-template>
					<h3 class="mb15">
						<a name="comment"></a><a href="#" target="_blank">Review of
							${recipe.title }</a><span style="display: none;" class="cm_totals">{{total}}</span>
					</h3>
					<div class="coping mbm clearfix">
						<c:choose>
							<c:when test="${empty user }">
								<div class="coimg mrm">
									<a href="javascript:void(0);" target="_blank"><img
										alt="Guest" src="#"></a>
								</div>
								<div class="cpont">
									<div class="textping r3 mbm">
										<span class="r3 noping">To post a review, <a
											href="login.do">Login</a> OR <a href="register.do"
											rel="nofollow">Register</a></span>
									</div>
									<button type="button" disabled="true" class="btnpl">Review</button>
								</div>
							</c:when>
							<c:otherwise>
								<form action="comment.do" method="post">
									<div class="coimg mrm">
										<a href="#" rel="nofollow" target="_blank" rel="nofollow"><img
											alt="username" src="#"></a>
									</div>
									<div class="cpont" id="weiboDiv">
										<textarea name="content" node-type="editor"
											class="textping r3 mbm"></textarea>
										<button name="comment" type="submit" class="btnpl">Review</button>
										<input type="hidden" name="recipeId" value="${recipe.rid }" />
										<input type="hidden" name="userId" value="${user.userId }" />
									</div>
								</form>
							</c:otherwise>
						</c:choose>
					</div>
					<c:forEach var="review" items="${ reviews }">
						<div class="coping ptb2010 clearfix libdm" data-template="lists"
							id="{{commentid}}">
							<div class="coimg mrm">
								<a href="#" rel="nofollow" target="_blank" rel="nofollow"><img
									alt="${review.userName }"
									src="userImage.do?userId=${review.reviewUid }"></a>
							</div>
							<div class="cpont">
								<div class="cppdd clearfix mb15">
									<span class="clk">${review.commentDate }</span> <span
										class="clo"><a class="user" href="#" target="_blank"
										rel="nofollow">${review.userName }</a></span>
								</div>
								<p class="mb20 fsm">${review.reviewText }</p>
								<div class="cppdd clearfix">
									<span class="clo"> <c:if
											test="user.userId==review.reviewUid">
											<a href="deleteComment.do?reviewId=${review.reviewId }">Delete</a>&nbsp;&nbsp;
										</c:if></span>
								</div>
							</div>
						</div>
					</c:forEach>
				</div>
			</div>
			<a name="cmt_btm"></a>
			<div class="pagination" id="cm_pages"></div>
		</div>
	</div>

	<div class="reright">
		<div class="cpauthor clearfix mt46 pbs bbe7">
			<div class="auhead">
				<a href="#" rel="nofollow" target="_blank"><img
					src="http://tx1.douguo.net/upload/photo/6/a/e/70_u0777121107072144.jpg"></a>
			</div>
			<h4>
				<a href="#" target="_blank">${ author.userName}</a>
			</h4>
			<span>Region</span> <a class="newgzz careadd2 trgz dblok"
				href="follow.do?userName=${author.userName}">+follow</a>
		</div>

		<div class="auintro bbe7 clearfix">
			<span class="sto"></span>
			<p class="itrp">
				self-introduction<span class="sbo"> </span>
			</p>
		</div>
		<div class="bbe7 clearfix mtm pbm mb25">
			<div class="ifans">
				<a href="#" class="pnuber">292</a> Recipes
			</div>
			<div class="ifans ble7">
				<a href="/u/u07771211/fans" class="pnuber">5369</a> followers
			</div>
		</div>
	</div>
</div>
</div>
</div>

<script src="js/cookbook.js"></script>
<script src="js/comment.js"></script>
<jsp:include page="template-bottom.jsp" />

