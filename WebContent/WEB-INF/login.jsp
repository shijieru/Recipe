<jsp:include page="template-top.jsp" />

<div id="main" class="clearfix">
	<div class="bgrf clearfix">
		<div class="nsoine">
			<div class="thplat">
				<h2>Login</h2>
				<h3>Third Party login</h3>
				<div class="rplate">
					<a class="btnrrr mtl mr6" href="/api/renren_login" target="_blank">Facebook</a>
				</div>
			</div>
			<div class="logbox">
				<h3>Login</h3>
				<jsp:include page="error-list.jsp" />
				<div class="logone">
					<form action="login.do" method="post" >
						<div class="itm clearfix">
							<label>Email</label>
							<div class="iput">
								<input id="email" name="email" onblur="checkemail('login')"
									value="" class="retext r5" type="text">
							</div>
							<span> </span>
						</div>
						<div class="itm mtl mb28 clearfix">
							<label>Password</label>
							<div class="iput">
								<input id="passwd" name="password" onblur="checkpassword()"
									value="" class="retext r5" maxlength="20" type="password">
								<span class="jizme mtm"><input name="is_remember"
									type="checkbox" id="is_remember" checked="checked" class="czl">
									Remember Me&nbsp;<font class="flin">|</font>&nbsp;<a
									href="javascript:fogetPassword();;">Forget Password</a></span>
							</div>
							<span></span>
						</div>
						<div class="iloo">
							<button id="doLogin" type="submit" class="btnrdz r3" name="button" value="login">Login</button>
							<span class="plm">Don't have an account,<a
								href="register.do" rel="nofollow">Register Here</a></span>
						</div>
						<input type="hidden" id="forward" value="/index.html" />
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	$(document).ready(function() {
		$("#email").focus();
		//$("#email").emailMatch();
	});

	function fogetPassword() {
		var input1 = $("#email").val();
		window.open("/forgetpassword.html?email=" + input1);
	}
</script>
<jsp:include page="template-bottom.jsp" />