<?php

declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;

#[AsController]
class ApiController
{
    #[Route('/api/ok', name: 'api_ok')]
    public function ok(): Response
    {
        return new JsonResponse([
            'status' => 'OK',
        ]);
    }
}