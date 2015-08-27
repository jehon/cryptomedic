<?php namespace App\Exceptions;

use Exception;
use Illuminate\Http\Response;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Debug\Exception\FlattenException;
use Symfony\Component\Debug\Exception\OutOfMemoryException;

class Handler extends ExceptionHandler {
	private function isMyClass($class) {
		$ns = explode('\\', __NAMESPACE__)[0];
		return ((substr($class, 0, strlen($ns) + 1) == $ns . "\\"));
	}

	private function formatClass($class) {
// 		if ($this->isMyClass($class)) {
// 			return "***$class***";
// 		}
		return "$class";
	}
	private function formatPath($path, $line)
	{
		$file = preg_match('#[^/\\\\]*$#', $path, $file) ? $file[0] : $path;
		return sprintf(' in %s line %d', $file, $line);
	}
	private function formatArgs(array $args)
	{
		$result = array();
		foreach ($args as $key => $item) {
			if ('object' === $item[0]) {
				$formattedValue = sprintf('object(%s)', $item[1]);
			} elseif ('array' === $item[0]) {
				$formattedValue = sprintf('array(%s)', is_array($item[1]) ? $this->formatArgs($item[1]) : $item[1]);
			} elseif ('string' === $item[0]) {
				$formattedValue = sprintf("'%s'", $item[1]);
			} elseif ('null' === $item[0]) {
				$formattedValue = '#null#';
			} elseif ('boolean' === $item[0]) {
				$formattedValue = '#'.strtolower(var_export($item[1], true)).'#';
			} elseif ('resource' === $item[0]) {
				$formattedValue = '#resource#';
			} else {
				$formattedValue = str_replace("\n", '', var_export((string) $item[1], true));
			}
	
			$result[] = is_int($key) ? $formattedValue : sprintf("'%s' => %s", $key, $formattedValue);
		}
	
		return implode(', ', $result);
	}
	
	/**
	 * A list of the exception types that should not be reported.
	 *
	 * @var array
	 */
	protected $dontReport = [
		'Symfony\Component\HttpKernel\Exception\HttpException'
	];

	/**
	 * Report or log an exception.
	 *
	 * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
	 *
	 * @param  \Exception  $e
	 * @return void
	 */
	public function report(Exception $e)
	{
		return parent::report($e);
	}

	/**
	 * Render an exception into an HTTP response.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Exception  $e
	 * @return \Illuminate\Http\Response
	 */
	public function render($request, Exception $e)
	{
// 		if (app()->environment() == 'production') {
// 			parent::render($request, $e);
// 		} else {
			if ($e instanceof HttpException) {
				$status = $e->getStatusCode();
			} else {
				$status = 500;
			}
			return new Response($this->textRender($e), $status);
// 		}
	}
	
	public function textRender(Exception $exception) {
		$content = "<pre>Problem:<br>\n";
		try {
			if (!$exception instanceof FlattenException) {
				$exception = FlattenException::create($exception);
			}
				
			$count = count($exception->getAllPrevious());
			$total = $count + 1;
			foreach ($exception->toArray() as $position => $e) {
				$ind = $count - $position + 1;
				$message = $e['message'];
				$content .= sprintf(
						"- %d/%d: %s%s -> %s <br>\n"
						, $ind, $total, $this->formatClass($e['class']), $this->formatPath($e['trace'][0]['file'], $e['trace'][0]['line']), $message);
				foreach ($e['trace'] as $trace) {
					$content .= '       ' . ($this->isMyClass($trace['class']) ? "<bold>" : "      ") . ' ';
					if ($trace['function']) {
						$content .= sprintf('at %s%s%s(%s)', $this->formatClass($trace['class']), $trace['type'], $trace['function'], $this->formatArgs($trace['args']));
					}
					if (isset($trace['file']) && isset($trace['line'])) {
						$content .= $this->formatPath($trace['file'], $trace['line']);
					}
					$content .= ($this->isMyClass($trace['class']) ? "</bold>" : "");
					$content .= "<br>\n";
				}
				$content .= " <br>\n";
			}
		} catch (\Exception $e) {
			// something nasty happened and we cannot throw an exception anymore
			$content = sprintf('Exception thrown when handling an exception (%s: %s)', get_class($e), $e->getMessage());
		}
		return $content;
	}
}
