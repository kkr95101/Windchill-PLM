package ext.ptc.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Properties;

import wt.util.WTProperties;


/**
 * 환경 설정 관련 Static 클래스.
 */
public class PTCEnv {
	
	public static String HOSTNAME;
	public static String WEBAPPNAME;
	public static String WTHOME;
	public static String CODEBASE;
	public static String CODEBASE_PATH;
	public static String DIRSEP;
	public static String ORG_NAME;
	public static String PRODUCT_DISPLAY;
	public static String PRODUCT_SEMICONDUCTOR;
	public static Properties IE;
	public static Properties DB;
	public static Properties DBCP;
	public static Properties URL;
	public static WTProperties wtproperties;
	
	//################## WINDCHILL ENV  ######################
	public static String WINDCHILL_JNDI_NAME;
	public static String WINDCHILL_JNDI_ID;
	public static String WINDCHILL_JNDI_PW;
	public static String DB_SERVICENAME;
	public static String DB_USER;
	public static String DB_PASSWORD;
	public static String ACTIVEX_CLASSID;
	public static String ACTIVEX_CODEBASE;
	
	//################## URL ENV  ######################
	public static String URL_OVERVIEW;
	public static String URL_PORTAL;
	public static String URL_REDIRECT;
	
	//################## DBCP ENV  ######################
	public static String DBCP_HOST;
	public static String DBCP_DBNAME;
	public static String DBCP_USER;
	public static String DBCP_PASSWORD;
	
	//################## ETC ENV  ######################
	public static String DELIM = "^";
	public static String DELIM2 = "#";
	
	public static String STATE_READY = "N";
	public static String STATE_RUN = "R";
	public static String STATE_FINISH = "Y";
	public static String AUTO_NUMBER = "GENERATE_AUTO_NUMBER";
	
	public static final String ICON_RED = "<img src=\"/Windchill/extcore/images/icon_red.gif\"/>";
	public static final String ICON_YELLOW = "<img src=\"/Windchill/extcore/images/icon_yellow.gif\"/>";
	public static final String ICON_GREEN = "<img src=\"/Windchill/extcore/images/icon_green.gif\"/>";
	public static final Hashtable<String, String[]> IPS_APPROVE_TYPE = new Hashtable<String, String[]>();
	public static final Hashtable<String, HashMap<String, String>> IPS_APPROVE_VCHK = new Hashtable<String, HashMap<String, String>>();
//	public static final DDBook ddBook = new DDBook(); 
	
	static {
		getWindchillEnv();
		getUrlEnv();
		setIPS_APPROVE_TYPE();
	}

	public static void getWindchillEnv() {
		try {
			wtproperties = WTProperties.getLocalProperties();
			WTHOME = wtproperties.getProperty("wt.home", "");
			HOSTNAME = wtproperties.getProperty("java.rmi.server.hostname", "");
			WEBAPPNAME = wtproperties.getProperty("wt.webapp.name", "");
			CODEBASE = wtproperties.getProperty("wt.server.codebase", "");
			CODEBASE_PATH = wtproperties.getProperty("wt.codebase.location", "");
			DIRSEP = wtproperties.getProperty("dir.sep", "/");
			
			File ieFile = null;
			FileInputStream ieInputStream = null;
			
			try {
				String iePropertyResource = wtproperties.getProperty("wt.federation.ie.propertyResource", "");
				ieFile = new File(iePropertyResource);
				ieInputStream = new FileInputStream(ieFile);
			} catch (FileNotFoundException enfex) {
				ieFile = new File(CODEBASE_PATH + DIRSEP + "WEB-INF" + DIRSEP + "ie.properties");
				ieInputStream = new FileInputStream(ieFile);
			}
			
			IE = new Properties();
			IE.load(ieInputStream);
			WINDCHILL_JNDI_NAME = wtproperties.getProperty("wt.federation.org.defaultAdapter", "");
			String ieSeeAlso = IE.getProperty("seeAlso", "ldapadmin");
			ieSeeAlso = ieSeeAlso.substring(ieSeeAlso.indexOf("cn="), ieSeeAlso.indexOf("@"));
			WINDCHILL_JNDI_ID = ieSeeAlso.substring(0, ieSeeAlso.indexOf(":"));
			WINDCHILL_JNDI_PW = ieSeeAlso.substring(ieSeeAlso.indexOf(":") + 1);
			
			File dbFile = null;
			FileInputStream dbInputStream = null;
			try {
				String dbPropertyResource = wtproperties.getProperty("wt.pom.properties", "");
				dbFile = new File(dbPropertyResource);
				dbInputStream = new FileInputStream(dbFile);
			} catch (FileNotFoundException enfex) {
				dbFile = new File(WTHOME + DIRSEP + "db" + DIRSEP + "db.properties");
				dbInputStream = new FileInputStream(dbFile);
			}
			
			DB = new Properties();
			DB.load(dbInputStream);
			DB_SERVICENAME = DB.getProperty("wt.pom.serviceName", "");
			DB_USER = DB.getProperty("wt.pom.dbUser", "");
			DB_PASSWORD = DB.getProperty("wt.pom.dbPassword", "");
			
			File dbcpFile = null;
			FileInputStream dbcpInputStream = null;
			try {
				dbcpFile = new File(CODEBASE_PATH + DIRSEP + "ext" + DIRSEP + "dbcp.properties");
				dbcpInputStream = new FileInputStream(dbcpFile);
				DBCP = new Properties();
				DBCP.load(dbcpInputStream);
				DBCP_HOST = DBCP.getProperty("dbServer", "");
				DBCP_DBNAME = DBCP.getProperty("dbName", "");
				DBCP_USER = DBCP.getProperty("userID", "");
				DBCP_PASSWORD = DBCP.getProperty("passwd", "");
			} catch (FileNotFoundException enfex) {
				enfex.printStackTrace();
			}
			
			ORG_NAME = "DIGITEK";
			PRODUCT_DISPLAY = "DISPLAY";
			PRODUCT_SEMICONDUCTOR = "SEMI";
			DELIM = "^";
			DELIM2 = "#";
		} catch (Exception wte) {
			wte.printStackTrace();
		}
	}
	
	public static void getUrlEnv() {
//		Config conf = ConfigImpl.getInstance();
//		URL_OVERVIEW = conf.getString("url.overview");
//		URL_REDIRECT = conf.getString("url.redirect", "");
//		URL_PORTAL = conf.getString("url.portal","");
	}
	
	public static void setIPS_APPROVE_TYPE(){
		
		IPS_APPROVE_TYPE.put("TYPE1",  new String[]{"DG_CONFIRMOR", "DG_APPROVAL", "DG_REFERENCE"});
		HashMap<String, String> tempMap = new HashMap<String, String>();
		tempMap.put("DG_CONFIRMOR", "n");
		tempMap.put("DG_APPROVAL", "y");
		tempMap.put("DG_REFERENCE", "n");
		IPS_APPROVE_VCHK.put("TYPE1", tempMap);
		
	}
}
