/**
 *  (C) 2013-2014 Stephan Rauh http://www.beyondjava.net
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package de.beyondjava.jsfComponents.body;

import java.io.IOException;

import javax.faces.component.UIComponent;
import javax.faces.context.*;
import javax.faces.render.FacesRenderer;

import org.primefaces.renderkit.CoreRenderer;

/**
 * This is an AngularJS-enabled html body tag.
 * 
 * @author Stephan Rauh http://www.beyondjava.net
 * 
 */
@FacesRenderer(componentFamily = NGBody.COMPONENT_FAMILY, rendererType = "de.beyondjava.Body")
public class NGBodyRenderer extends CoreRenderer {

   /**
    * Begin the body tag. This is where the attributes ng-app, ng-controller and
    * onload are set.
    * 
    * @author Stephan Rauh http://www.beyondjava.net
    */
   @Override
   public void encodeBegin(FacesContext context, UIComponent component) throws IOException {
      ResponseWriter writer = context.getResponseWriter();
      writer.append("\r\n");
      writer.startElement("body", null);
      String ngApp = (String) component.getAttributes().get("ng-app");
      if (null != ngApp) {
         writer.writeAttribute("ng-app", ngApp, null);
      }
      else {
         writer.append(" ng-app ");
      }
      String ngController = (String) component.getAttributes().get("ng-controller");
      if (null != ngController) {
         writer.writeAttribute("ng-controller", ngController, null);
      }

      writer.writeAttribute("onload", "restoreValues()", null);
      writer.append("\r\n");
      writer.append("\r\n");
      // context.getApplication().createComponent("MyComponentType")
      // <h:outputScript library="theme1" name="js/hello.js" />
      writer.append("<script src=\"../resources/AngularFaces/angular.js\">\r\n</script>\r\n");
      // writer.append("<script src=\"../javax.faces.resource/glue.js.jsf?ln=AngularFaces\"></script>\r\n");
      writer.append("<script src=\"../resources/AngularFaces/glue.js\">\r\n</script>\r\n");
      writer.append("<script src=\"" + ngController + ".js\"></script>\r\n");

      NGResponseWriter angularWriter = new NGResponseWriter(writer, writer.getContentType(),
            writer.getCharacterEncoding(), "");
      context.setResponseWriter(angularWriter);
   }

   /**
    * Finishes the body tag. Adds a call to the Javascript function
    * storeValues().
    * 
    * @author Stephan Rauh http://www.beyondjava.net
    */
   @Override
   public void encodeEnd(FacesContext context, UIComponent component) throws IOException {
      super.encodeEnd(context, component);
      ResponseWriter writer = context.getResponseWriter();
      writer.append("\r\n");
      writer.append("  <script>storeValues();</script>");
      writer.append("\r\n");
      writer.append("</body>");
   }
}