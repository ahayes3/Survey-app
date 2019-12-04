package survey;

import java.util.List;
import java.util.ArrayList;
import java.util.Properties;
import javax.ws.rs.*;
import java.io.File;
import java.io.*;
import javax.ws.rs.core.MediaType;
import javax.json.JsonObjectBuilder;
import javax.json.JsonObject;
import javax.json.Json;
import javax.json.JsonReader;
import javax.json.JsonArray;
import javax.ws.rs.core.Response;

@Path("surveys")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class PropertiesResource {

    @GET
    public Response getSurveys() {
	    System.out.println(System.getProperty("user.dir"));
	    InputStream fis=null;
	    try
	    {
	        fis=new FileInputStream("../../../../../src/main/java/survey/surveys.json");
		System.out.println("MADE IT HERE");
	    }catch(IOException e){e.printStackTrace();}

	    JsonReader reader=Json.createReader(fis);
	    //JsonObject obj=reader.readObject();
	    //JsonObjectBuilder survey=Json.createObjectBuilder();
	    //survey.add(obj);
	    System.out.println("CALLED");
            //JsonObject built=survey.build();
	    JsonArray array = reader.readArray();
	    try
	    {
	    fis.close();
	    }catch(IOException e){e.printStackTrace();}
	    return Response.ok(array,MediaType.APPLICATION_JSON).build();
    }

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
