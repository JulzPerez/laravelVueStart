<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class RunCodeController extends Controller
{
    //    
    public function runCode(){

 /*        //$input = new InputStream();
        $process = new Process(['cmd','sample.exe']);

        try {
            $process->mustRun();

            echo $process->getOutput();
        } catch (ProcessFailedException $exception) {
            echo $exception->getMessage();
        }   
  */

       $output = array();
       system('simple_batch_file',$output);
       //exec('notepad.exe');
        //return $output;
       //return exec('whoami');


    }   
}
