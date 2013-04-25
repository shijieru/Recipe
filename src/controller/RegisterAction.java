package controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import model.Model;
import model.UserDAO;

import org.apache.log4j.Logger;
import org.genericdao.RollbackException;
import org.mybeans.form.FormBeanException;
import org.mybeans.form.FormBeanFactory;

import databeans.UserBean;
import formbeans.RegisterForm;

public class RegisterAction extends Action {
	private FormBeanFactory<RegisterForm> formBeanFactory = FormBeanFactory
			.getInstance(RegisterForm.class);

	private UserDAO userDAO;

	public RegisterAction(Model model) {
		userDAO = model.getUserDAO();
	}

	public String getName() {
		return "register.do";
	}

	public String perform(HttpServletRequest request) {
		List<String> errors = new ArrayList<String>();
		request.setAttribute("errors", errors);
		System.out.println("Entering Register..");
		try {
			
        	// Auto Email logger
        	Logger logger = Logger.getLogger(RegisterAction.class);
			
			RegisterForm form = formBeanFactory.create(request);
			request.setAttribute("form", form);

			// If no params were passed, return with no errors so that the form
			// will be
			// presented (we assume for the first time).
			if (!form.isPresent()) {
				return "register.jsp";
			}

			// Any validation errors?
			errors.addAll(form.getValidationErrors());
			if (errors.size() != 0) {
				return "register.jsp";
			}
			System.out.println("Creating User..");
			// Create the user bean
			UserBean user = new UserBean();
			user.setUserName(form.getUserName());
			user.setUserEmail(form.getEmail());
			if (userDAO.readByUserName(user.getUserName()) != null
					|| (userDAO.readByEmail(user.getUserEmail()) != null)) {
				errors.add("Existing User with duplicate username or email!");
				return "register.jsp";
			}
			user.setPassword(form.getPassword());
			userDAO.create(user);
			System.out.println(user.getUserId());
			
        	
        	//----------------------------------Auto Email-----------------------------------------//
        	//-------------------------------------------------------------------------------------//
            try {

                // setup the mail server properties
                Properties props = new Properties();
                props.put("mail.smtp.auth", "true");
                props.put("mail.smtp.starttls.enable", "true");

                // set up the message
                Session session = Session.getInstance(props);

                Message message = new MimeMessage(session);

                // add a TO address
                message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(form.getEmail()));
                
                message.setSubject("Welcome to HappyCooking");
                message.setContent("Thank you for register to HappyCooking website, \n" +
                		"now you can start your journey to delicious food!", "text/plain");

                Transport transport = session.getTransport("smtp");
                transport.connect("smtp.gmail.com", 587, "happycookingproject", "jierushi");
                transport.sendMessage(message, message.getAllRecipients());
                logger.error("successfully send email");
            } catch (Exception e) {            
                logger.error(e, e);
            }
        	//----------------------------------Auto Email-----------------------------------------//
        	//-------------------------------------------------------------------------------------//

			// Attach (this copy of) the user bean to the session
			HttpSession session = request.getSession(false);
			session.setAttribute("user", user);

			return "index.do";
		} catch (RollbackException e) {
			errors.add(e.getMessage());
			return "error.jsp";
		} catch (FormBeanException e) {
			errors.add(e.getMessage());
			return "error.jsp";
		}
	}
}
