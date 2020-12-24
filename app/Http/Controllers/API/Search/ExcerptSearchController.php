<?php

namespace App\Http\Controllers\API\Search;

use App\Http\Controllers\API\Controller;
use App\Services\SearchService;
use Illuminate\Http\Request;
use InvalidArgumentException;

class ExcerptSearchController extends Controller
{
    private $searchService;

    public function __construct(SearchService $searchService)
    {
        $this->searchService = $searchService;
    }

    public function index(Request $request)
    {
        if (!$request->get('q')) {
            throw new InvalidArgumentException('A search query is required.');
        }

        return [
            'results' => $this->searchService->excerptSearch($request->get('q')),
        ];
    }
}
