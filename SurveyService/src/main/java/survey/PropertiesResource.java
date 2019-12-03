package survey;

import java.util.Properties;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

// tag::path[]
@Path("surveys")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
// end::path[]
public class PropertiesResource {

    @GET
    public String getSurveys() { return "test"; }

    @POST
    public String addSurvey(String surveyJSON) { return "test1"; }

    @Path("/{user}")
    @GET
    public String getUserSurveys(@PathParam("user") final String user) {
        return user + "'s surveys";
    }

    @Path("/{user}/{key}")
    @GET
    public String getSearchSurveys(@PathParam("user") final String user, @PathParam("key") final String key) {
        return user + "'s surveys with " + key;
    }
}
