<jsp:include page="template-top.jsp" />
<script src="js/signup.js"></script>

<div id="main" class="clearfix">
	<div class="bgrf clearfix">
		<div class="nsoine">
			<div class="thplat">
				<h2>Register</h2>
				<h3>Third Party quick login</h3>
				<div class="rplate">
					<a class="btnrrr  mtl mr6" href="#" target="_blank">facebook</a>
				</div>
			</div>
			<div class="logbox">
				<h3>Register an account</h3>
				<jsp:include page="error-list.jsp" />
				<div class="logone">
					<form action="register.do" method="post"
						onkeydown="if(event.keyCode==13){return false;}">
						<div class="itm clearfix">
							<label>Email</label>
							<div class="iput">
								<input id="email" name="email" autocomplete="off"
									onblur="checkemail('register');" value="" class="wwinct r5"
									type="text">
							</div>
							<span></span>
						</div>
						<div class="iisi"></div>
						<div class="itm clearfix">
							<label>Username</label>
							<div class="iput">
								<input id="username" name="userName" onblur="checknickname();"
									value="" class="wwinct r5" maxlength="20" type="text">
							</div>
							<span> </span>
						</div>
						<div class="iisi"></div>
						<div class="itm clearfix">
							<label>Password</label>
							<div class="iput">
								<input id="passwd" name="password" value=""
									onkeydown="if(event.keyCode=='32'){return false;}"
									onblur="checkpassword();" class="wwinct r5" maxlength="20"
									type="password">
							</div>
							<span></span>
						</div>
						<div class="iisi"></div>
						<div class="itm clearfix">
							<label>Confirm</label>
							<div class="iput">
								<input id="dpasswd" name="confirm"
									onkeydown="if(event.keyCode=='32'){return false;}"
									onblur="checkdoublepassword();" value="" class="wwinct r5"
									maxlength="20" type="password">
							</div>
							<span></span>
						</div>
						<div class="iisi"></div>
						<div class="iloo">
							<button id="doLogin" type="submit" name="button" value="register"
								class="btnrdz r3">Register</button>
							<span class="plm">Already have an account,<a
								href="login.do" rel="nofollow">login here</a></span>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	$(document).ready(function() {
		$("#email").focus();
		$("#email").emailMatch();

	});
</script>

<jsp:include page="template-bottom.jsp" />
