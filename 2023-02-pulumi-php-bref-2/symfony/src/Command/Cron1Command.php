<?php

declare(strict_types=1);

namespace App\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(name: 'app:cron1')]
class Cron1Command extends Command
{
    protected function configure()
    {
        $this
            ->addArgument('arg1', InputArgument::REQUIRED, 'Argument 1')
            ->addOption('option1', null, InputOption::VALUE_REQUIRED, 'Option 1')
        ;
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $arg1 = $input->getArgument('arg1');
        $option1 = $input->getOption('option1');

        $output->writeln('arg1: ' . $arg1);
        if ($option1) {
            $output->writeln('option1: ' . $option1);
        }

        return Command::SUCCESS;
    }
}