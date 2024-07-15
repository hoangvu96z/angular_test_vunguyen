pipeline {
    agent { 
        label 'node14'
    } 
    tools {
        nodejs 'nodejs14'
    }
    stages {
        stage('Install') {
            steps {
                sh '''
                    npm install -f
                '''
            }
        }
        stage('Build') {
            steps {
                 script{
                    def changeLog = getChangedFilesList();
                    def arrayProject = [];
                   for(String value in changeLog) { 
                       echo "value 1 ${value}";
                        if (value.matches("(.*)projects/navigation/(.*)")) {
                            arrayProject.add('nav');
                            echo "nav1";
                        } else if (value.matches("(.*)projects/starter/(.*)")) {
                            arrayProject.add('starter');
                            echo "starter";
                        }
                    };
                    arrayProject.unique();
                     for(String value in arrayProject) { 
                        if (value.equals("nav")) {
                            sh '''
                                npm run build:nav
                            '''
                        } else if (value.equals("starter")) {
                            sh '''
                                npm run build:starter
                            '''
                        }
                     };
                    echo "arrayProject ${arrayProject}";
                    echo "changeLog ${changeLog}";
                 }
            }
        }
    }
}
// returns a list of changed files
@NonCPS
String getChangedFilesList() {
    changedFiles = []
    for (changeLogSet in currentBuild.changeSets) {
        for (entry in changeLogSet.getItems()) { // for each commit in the detected changes
            for (file in entry.getAffectedFiles()) {
                changedFiles.add(file.getPath()) // add changed file to list
            }
        }
    }
    return changedFiles
}