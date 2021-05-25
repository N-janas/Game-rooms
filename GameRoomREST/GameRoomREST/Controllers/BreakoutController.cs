using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GameRoomREST.Controllers
{
    public class BreakoutController : Controller
    {
        // GET: Breakout
        public String Index()
        {
            StreamReader sr = System.IO.File.OpenText(Server.MapPath("Games/breakout.txt"));
            String strContents = sr.ReadToEnd();

            return strContents;
        }
    }
}