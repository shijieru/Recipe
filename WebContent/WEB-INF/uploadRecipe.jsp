<jsp:include page="template-top.jsp" />
<script src="js/ajaxUpload.js"></script>
<script src="js/taginfo.js"></script>
<script src="js/upfood.js"></script>

<div id="main" class="clearfix">
	<div class="uptit relative">
		<h1>Create Recipe</h1>
	</div>
	<div id="upwrongtips" class="upwrons hidden"></div>
	<jsp:include page="error-list.jsp" />
	<form enctype="multipart/form-data" action="uploadRecipe.do"
		method="post" name="recipeform" id="recipeform">
		<div class="upfood clearfix">
			<div class="foname pvl libufo">
				<input id="cook_name" name="title" type="text" maxlength="30"
					class="upfnam r5" placeholder="title" value="${form.title}"
					onfocus="if(this.value=='title') {this.value=''; $(this).addClass('fcbm'); }"
					onblur="if(!this.value) {this.value='title';$(this).removeClass('fcbm');}" />
			</div>
			<div class="foicp pvl clearfix libufo">
				<div class="sccpp mrl">
					<div class="icross">
						<h1>Final Picture</h1>
						<input type="file" name="finalpic" id="coverImageUrl">
					</div>
				</div>
				<div class="restory pbm">
					<select id="cook_difficulty" name="difficulty" class="seleco">
						<option value="">Difficulty</option>
						<option value="1">Beginner</option>
						<option value="2">Intermediate</option>
						<option value="3">Expert</option>
					</select> <select id="costtime" name="time" class="seleco">
						<option value="">Cooking time</option>
						<option value="10">10min</option>
						<option value="30">10-30min</option>
						<option value="60">30-60min</option>
						<option value="70">more than 1h</option>
					</select>
				</div>
				<div class="rory">
					<textarea name="story" class="strtext r3"
						onfocus="if(this.value=='story(optional)') {this.value=''; $(this).addClass('fcbm'); }"
						onblur="if(!this.value) {this.value='story(optional)';$(this).removeClass('fcbm');}"
						placeholder="story(optional)" value="${form.story}"></textarea>
				</div>
			</div>
			<div class="ingredient pvl clearfix">
				<div class="moom clearfix mr30">
					<div class="mct clearfix ptb1510">
						<span class="liao">Main Ingredients</span> <span class="liang">Amount</span>
					</div>
					<div class="mct clearfix mbs">
						<span class="liao"><input type="text"
							class="liaoext r3 fcbm" name="mainIngredient"
							value="${form.mainIngredient[0]}" /></span> <span class="liang"><input
							type="text" class="liangext r3 fcbm" name="mainAmount"
							value="${form.mainAmount[0]}" /></span> <span class="sxgj hidden"><a
							href="javascript:void(0);" class="wrng">x</a></span>
					</div>
					<div class="mct clearfix mbs">
						<span class="liao"><input type="text"
							class="liaoext r3 fcbm" name="mainIngredient"
							value="${form.mainIngredient[1]}" /></span> <span class="liang"><input
							type="text" class="liangext r3 fcbm" name="mainAmount"
							value="${form.mainAmount[1]}" /></span> <span class="sxgj hidden"><a
							href="javascript:void(0);" class="wrng">x</a></span>
					</div>
					<div class="mct clearfix mbs">
						<span class="liao"><input type="text"
							class="liaoext r3 fcbm" name="mainIngredient"
							value="${form.mainIngredient[2]}" /></span> <span class="liang"><input
							type="text" class="liangext r3 fcbm" name="mainAmount"
							value="${form.mainAmount[2]}" /></span> <span class="sxgj hidden"><a
							href="javascript:void(0);" class="wrng">x</a></span>
					</div>
					<div class="adlan">
						<a href="javascript:void(0);" id="zhuliao">Add one row</a>
					</div>
				</div>
				<div class="moom clearfix">
					<div class="mct clearfix ptb1510">
						<span class="liao">Auxilary Ingredients</span> <span class="liang">Amount</span>
					</div>
					<div class="mct clearfix mbs">
						<span class="liao"><input type="text"
							class="liaoext r3 fcbm" name="auxIngredient"
							value="${form.auxIngredient[0]}" /></span> <span class="liang"><input
							type="text" class="liangext r3 fcbm" name="auxAmount"
							value="${form.auxAmount[0]}" /></span> <span class="sxgj hidden"><a
							href="javascript:void(0);" class="wrng">x</a></span>
					</div>
					<div class="mct clearfix mbs">
						<span class="liao"><input type="text"
							class="liaoext r3 fcbm" name="auxIngredient"
							value="${form.auxIngredient[1]}" /></span> <span class="liang"><input
							type="text" class="liangext r3 fcbm" name="auxAmount"
							value="${form.auxAmount[1]}" /></span> <span class="sxgj hidden"><a
							href="javascript:void(0);" class="wrng">x</a></span>
					</div>
					<div class="mct clearfix mbs">
						<span class="liao"><input type="text"
							class="liaoext r3 fcbm" name="auxIngredient"
							value="${form.auxIngredient[2]}" /></span> <span class="liang"><input
							type="text" class="liangext r3 fcbm" name="auxIngredient"
							value="${form.auxAmount[2]}" /></span> <span class="sxgj hidden"><a
							href="javascript:void(0);" class="wrng">x</a></span>
					</div>
					<div class="adlan">
						<a href="javascript:void(0);" id="fuliao">Add one row</a>
					</div>
				</div>
			</div>
			<div class="fosetp pv15 clearfix">
				<h3 class="mb15">Steps</h3>
				<div class="nsetp mbm clearfix">
					<span class="tjbz mrl"> <input type="file" name="stepPic" />
					</span> <span class="umber rl3">1</span> <span class="bzmw mrs"><textarea
							name="stepDescription" class="steptext r3 fcbm"
							value="${form.stepDescription[0]}"></textarea></span> <span
						class="sxgj hidden"> <a href="javascript:void(0);"
						class="ic_up">up</a> <a href="javascript:void(0);" class="ic_dw">dw</a>
						<a href="javascript:void(0);" class="ic_ad">+</a> <a
						href="javascript:void(0);" class="ic_close">x</a>
					</span>
				</div>
				<div class="nsetp mbm clearfix">
					<span class="tjbz mrl"> <input type="file" name="stepPic" /></span>
					<span class="umber rl3">2</span> <span class="bzmw mrs"><textarea
							name="stepDescription" class="steptext r3 fcbm"
							value="${form.stepDescription[1]}"></textarea></span> <span
						class="sxgj hidden"> <a href="javascript:void(0);"
						class="ic_up">up</a> <a href="javascript:void(0);" class="ic_dw">dw</a>
						<a href="javascript:void(0);" class="ic_ad">+</a> <a
						href="javascript:void(0);" class="ic_close">x</a>
					</span>
				</div>
				<div class="ayibu">
					<a href="javascript:void(0);" id="addBuZhou">Add one step</a>
				</div>
			</div>
			<div class="ltip pvl clearfix">
				<h3>Tips</h3>
				<textarea name="tips" class="tiptext r3"
					onfocus="if(this.value=='(optional)') {this.value=''; $(this).addClass('fcbm'); }"
					onblur="if(!this.value) {this.value='(optional)';$(this).removeClass('fcbm');}"
					placeholder="optional"></textarea>
			</div>

			<div class="tag">
				<h3>Add Tags(divide by space)</h3>
				<div id="cooktagInput" class="tipu r3 mb20 clearfix">
					<span class="intput"><input type="text" id="taginfo"
						name="tags" info="upfood" class="intag fcbm" value=""></span>
				</div>
				<div class="hotap mb15 clearfix">
					<span>Popular tags:</span> <a href="javascript:void(0)"
						class="cooktag" info="upfood">baking</a> <a
						href="javascript:void(0)" class="cooktag" info="upfood">vegetable
						dish</a> <a href="javascript:void(0)" class="cooktag" info="upfood">entry</a>
					<a href="javascript:void(0)" class="cooktag" info="upfood">dessert</a>
					<a href="javascript:void(0)" class="cooktag" info="upfood">soup</a>
				</div>
			</div>
		</div>

		<div class="fbcaip mb50">
			<br> <input type="hidden" name="button" value="create">
			</input>
			<button id="uploadCaipuInfo" type="button" class="btnfb fwb"
				onclick="uploadInfos();">Create</button>
		</div>
	</form>
</div>
<jsp:include page="template-bottom.jsp" />