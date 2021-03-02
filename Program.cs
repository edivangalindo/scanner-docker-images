using System;
using System.Diagnostics;
using System.IO;
using Figgle;

namespace scanner_docker_images
{
    class Program
    {
        public static void DeleteDirectory(string target_dir)
        {
            string[] files = Directory.GetFiles(target_dir);
            string[] dirs = Directory.GetDirectories(target_dir);

            foreach (string file in files)
            {
                File.SetAttributes(file, FileAttributes.Normal);
                File.Delete(file);
            }

            foreach (string dir in dirs)
            {
                DeleteDirectory(dir);
            }

            Directory.Delete(target_dir, false);
        }
        static void Main(string[] args)
        {
            Console.WriteLine(FiggleFonts.Rectangles.Render("Scanner Docker Images"));

            var currentDirectory = Directory.GetCurrentDirectory();
            var viewDirectory = $"{currentDirectory}/view";
            var resultsDirectory = $"{currentDirectory}/view/results";

            DeleteDirectory(resultsDirectory);
            Directory.CreateDirectory(resultsDirectory);

            /*
                Put your containers to scan here

                Example:

                string[] containers = {
                    "container_name_image:latest",
                    "container_name_image2:1.0.0",
                    "container_name_image3:1.2"
                };
            */

            string[] containers = { };

            var trivyProcessInfo = new ProcessStartInfo
            {
                FileName = "trivy",
                WindowStyle = ProcessWindowStyle.Hidden,
                UseShellExecute = false,
                RedirectStandardOutput = true,
            };

            foreach (string container in containers)
            {
                var analysisGuid = Guid.NewGuid();
                trivyProcessInfo.Arguments = $"image -f json -o {resultsDirectory}/results@{analysisGuid}.json {container}";

                using (var process = Process.Start(trivyProcessInfo))
                {
                    Console.WriteLine($"Analyzing container: {container}");
                    process.WaitForExit();
                }
            }

            var npmProcessInfo = new ProcessStartInfo
            {
                FileName = "npm",
                Arguments = "start",
                WorkingDirectory = $"{viewDirectory}",
                WindowStyle = ProcessWindowStyle.Hidden,
                UseShellExecute = false,
                RedirectStandardOutput = true,

            };

            var npmProcess = Process.Start(npmProcessInfo);
            Console.WriteLine("Server started on http://localhost:3000");
            npmProcess.WaitForExit();
        }
    }
}
